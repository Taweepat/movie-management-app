import { observer } from "mobx-react-lite";
import { useStore } from "../hooks/useStore";
import type { UserRole } from "../models/rootStore";

const roles: UserRole[] = ["MANAGER", "TEAMLEADER", "FLOORSTAFF"];

export const RoleSelector = observer(function RoleSelector() {
  const { setRole, currentUserRole } = useStore();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">Role:</span>
      <select
        value={currentUserRole}
        onChange={(e) => setRole(e.target.value as UserRole)}
        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    </div>
  );
});
