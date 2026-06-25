import React from "react";

export default function UnknownUser() {
  return (
    <div className="bg-emerald-100 dark:bg-emerald-950/60 w-full h-full rounded-full overflow-hidden flex items-center justify-center border border-emerald-200/50 dark:border-emerald-800/30 transition-colors duration-300">
      <svg
        xmlns="http://w3.org"
        viewBox="0 0 24 24"
        width="100%"
        height="100%"
        fill="currentColor"
      >
        {/* Silhouette de l'utilisateur en blanc éclatant pour ressortir sur le fond émeraude */}
        <g fill="#FFFFFF" className="dark:fill-emerald-300/90 opacity-95 transition-colors duration-300">
          {/* Tête de l'utilisateur */}
          <circle cx="12" cy="8.5" r="3.5" />
          {/* Tronc ajusté pour remplir proprement le bas du cercle */}
          <path d="M12 13.5c-4.2 0-7.7 2.5-8.8 6A11.9 11.9 0 0 0 12 24c3.3 0 6.3-1.3 8.8-4.5-1.1-3.5-4.6-6-8.8-6z" />
        </g>
      </svg>
    </div>
  );
}
