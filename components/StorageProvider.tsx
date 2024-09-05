import { Platform } from "react-native";
import * as SQLite from "expo-sqlite";
import { Store, createStore } from "tinybase";
import { createLocalPersister } from "tinybase/persisters/persister-browser";
import { Persister } from "tinybase/persisters";
import { createExpoSqlitePersister } from "tinybase/persisters/persister-expo-sqlite";
import {
  Provider,
  useCreatePersister,
  useCreateStore,
} from "tinybase/ui-react";

// Define the shape of your store's data
interface BibleStoreSchema {
  tables: {
    bible: {
      text: string;
      done: boolean;
    };
  };
}

// StorageProvider props
interface StorageProviderProps {
  children: React.ReactNode;
}

// StorageProvider component
const BibleProvider: React.FC<StorageProviderProps> = ({ children }) => {
  const store = useCreateStore<BibleStoreSchema>(() =>
    createStore<BibleStoreSchema>()
  );
  useAndStartPersister(store);

  return <Provider store={store}>{children}</Provider>;
};

const useAndStartPersister = (store: Store<BibleStoreSchema>) =>
  useCreatePersister(
    store,
    (store: Store<BibleStoreSchema>) =>
      Platform.OS === "web"
        ? createLocalPersister(store, "todos")
        : createExpoSqlitePersister(store, SQLite.openDatabaseSync("todos.db")),
    [],
    (persister: Persister<BibleStoreSchema>) =>
      persister.load().then(persister.startAutoSave)
  );

export { BibleProvider };
