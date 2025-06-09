import {
  Provider,
  useCreatePersister,
  useCreateStore,
} from "tinybase/ui-react";
import { createBibleStore, createBiblePersister } from "@/utils/tinybase";

interface TinyBaseProviderProps {
  children: React.ReactNode;
}

export function TinyBaseProvider({ children }: TinyBaseProviderProps) {
  let store = useCreateStore(createBibleStore);

  useCreatePersister(store, createBiblePersister, [], async (persister) => {
    await persister.load();
    await persister.startAutoSave();
  });

  return <Provider store={store}>{children}</Provider>;
}
