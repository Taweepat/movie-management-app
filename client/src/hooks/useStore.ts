import { createContext, useContext } from "react";
import type { RootStoreType } from "../models/rootStore";

export const StoreContext = createContext<RootStoreType>({} as RootStoreType);

export function useStore() {
  return useContext(StoreContext);
}
