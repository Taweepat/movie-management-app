import { types } from "mobx-state-tree";
import type { Instance } from "mobx-state-tree";
import { MovieStore } from "./movieStore";

export type UserRole = "MANAGER" | "TEAMLEADER" | "FLOORSTAFF";

export const RootStore = types
  .model("RootStore", {
    movieStore: types.optional(MovieStore, { movies: [] }),
    currentUserRole: types.optional(
      types.enumeration("UserRole", ["MANAGER", "TEAMLEADER", "FLOORSTAFF"]),
      "FLOORSTAFF"
    ),
  })
  .views((self) => ({
    get isManager() {
      return self.currentUserRole === "MANAGER";
    },
  }))
  .actions((self) => ({
    setRole(role: UserRole) {
      self.currentUserRole = role;
      localStorage.setItem("userRole", role);
    },
  }));

export interface RootStoreType extends Instance<typeof RootStore> {}
