import { LuSettings } from "react-icons/lu";

export default function AnimatedSettingsButton({ onClick, className = "" }) {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    } else {
      console.log("Bouton paramètres cliqué !");
    }
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 group ${className}`}
      aria-label="Ouvrir les paramètres"
    >
      {/* Ajout de la classe personnalisée 'animate-spin-y' */}
      <LuSettings className="w-6 h-6 animate-spin-y fill-black stroke-emerald-600" strokeWidth={2} />
      
      {/* Injection CSS corrigée et simplifiée */}
      <style>{`
        @keyframes custom-spin-y {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); } /* Correction du doublon ici */
        }
        
        .animate-spin-y {
          animation: custom-spin-y 3s linear infinite;
        }

        /* Accélération de la rotation au survol du bouton (via la classe group) */
        .group:hover .animate-spin-y {
          animation: custom-spin-y 1s linear infinite;
        }
      `}</style>
    </button>
  );
}
