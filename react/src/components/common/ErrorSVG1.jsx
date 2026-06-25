import React from "react";

export default function ErrorSVG1({ height = "44", width = "44", strokeColor="neutral-600" }) {
  return (
    <div className={`mb-6 h-${height} w-${width}`}>
      <svg
        viewBox="0 0 200 200"
        className="h-full w-full"
        xmlns="http://w3.org"
      >
        {/* Cercle extérieur pointillé */}
        <circle
          cx="100"
          cy="100"
          r="80"
          className={`fill-none stroke-${strokeColor} stroke-[2px] [stroke-dasharray:4_4]`}
        />

        {/* Cercle intérieur fixe */}
        <circle
          cx="100"
          cy="100"
          r="40"
          className={`fill-none stroke-${strokeColor} stroke-[1.5px]`}
        />

        {/* Ligne de scan radar animée (Rotation) */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="20"
          className={`origin-[100px_100px] animate-[spin_4s_linear_infinite] stroke-${strokeColor} stroke-2`}
        />

        {/* Point cible perdu (Clignotement rouge discret) */}
        <circle cx="140" cy="70" r="5" className="animate-pulse fill-red-500" />
      </svg>
    </div>
  );
}
