import React, { useContext } from "react";
import DynamicNavbarPath from "./DynamicNavbarPath";
import ApiService from "../../services/apiService";
import UserContext from "../../contexts/UserContext";

export default function AuthNav() {
  const { setUser } = useContext(UserContext);
  return (
    <div className="sticky z-50 top-0 left-0 w-full flex justify-between items-center gap-3 bg-slate-50 h-14 border-b border-b-slate-200 dark:border-slate-800 dark:bg-slate-900 px-3">
      <DynamicNavbarPath />
      <button
        className="cursor-pointer"
        onClick={async () => {
          await ApiService.logout();
          setUser(null);
        }}
      >
        Logout
      </button>
    </div>
  );
}
