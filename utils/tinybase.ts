import { createStore, Store } from "tinybase";
import { createExpoSqlitePersister } from "tinybase/persisters/persister-expo-sqlite";
import { createLocalPersister } from "tinybase/persisters/persister-browser";
import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";

// Create the TinyBase store for bible reading tracking
export function createBibleStore(): Store {
  return createStore();
}

// Create the appropriate persister based on platform
export function createBiblePersister(store: Store) {
  return Platform.OS === "web"
    ? createLocalPersister(store, "bible-memo")
    : createExpoSqlitePersister(
        store,
        SQLite.openDatabaseSync("bible-memo.db"),
        {
          mode: "json", // JSON mode required for MergeableStore
          storeTableName: "bible-memo",
        }
      );
}
