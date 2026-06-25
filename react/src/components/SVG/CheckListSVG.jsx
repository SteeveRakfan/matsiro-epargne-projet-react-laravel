import React from "react";

export default function CheckListSVG(props) {
  return (
    <div className={`${props.className}`}>
      <svg
        xmlns="http://w3.org"
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
      >
        Version filigrane épurée (Style Icône Filaire / Caricature) Couleur
        unique : Emerald-600 (#059669) avec opacité à 15% pour le fond d'écran
        <g
          fill="none"
          stroke="#059669"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.50"
        >
          <rect x="15" y="10" width="50" height="75" rx="5" />

          <rect x="23" y="23" width="10" height="10" rx="2" />
          <path d="M 25 28 L 28 31 L 35 24" />
          <line x1="40" y1="28" x2="57" y2="28" />

          <rect x="23" y="43" width="10" height="10" rx="2" />
          <line x1="40" y1="48" x2="57" y2="48" />

          <rect x="23" y="63" width="10" height="10" rx="2" />
          <line x1="40" y1="68" x2="52" y2="68" />

          <g transform="rotate(15 75 50)">
            <path d="M 72 20 L 78 20 L 78 70 L 75 77 L 72 70 Z" />

            <line x1="78" y1="30" x2="83" y2="35" />

            <path d="M 72 70 L 78 70" />
          </g>
        </g>
      </svg>
    </div>
  );
}
