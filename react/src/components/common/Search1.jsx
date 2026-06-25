import React from "react";
import { FaSearch } from "react-icons/fa";

export default function Search1() {
  return (
    <div className="w-full">
      {/* Conteneur principal avec bordure discrète et gestion du focus */}
      <div className="flex items-center gap-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 focus-within:border-emerald-500 dark:focus-within:border-emerald-400 transition-all duration-200 shadow-xs">
        {/* Icône de recherche */}
        <div className="text-slate-400 dark:text-slate-500 flex items-center justify-center">
          <label htmlFor="search1_input" className="cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            <FaSearch className="text-xs" />
          </label>
        </div>
        
        {/* Champ de saisie optimisé */}
        <input
          type="text"
          id="search1_input"
          className="w-full bg-transparent text-slate-800 dark:text-slate-200 text-[0.85rem] placeholder-slate-400 dark:placeholder-slate-500 outline-hidden border-none p-0 focus:ring-0"
          placeholder="Rechercher..."
        />
      </div>
    </div>
  );
}
