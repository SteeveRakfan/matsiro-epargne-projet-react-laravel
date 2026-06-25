import React from "react";

export default function HamburgerSVG(props) {
  return (
    <div className={`${props.className}`}>
      <svg
        xmlns="http://w3.org"
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
      >
        Version filigrane épurée (Style Icône Filaire / Caricature) Couleur
        unique : Emerald-600 (#059669) avec opacité adaptative
        <g
          fill="none"
          stroke="#059669"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.50"
        >
          <path d="M 15 45 C 15 15, 85 15, 85 45 Z" />

          <path d="M 35 30 L 37 32" strokeWidth="3" />
          <path d="M 50 25 L 52 27" strokeWidth="3" />
          <path d="M 65 30 L 67 32" strokeWidth="3" />

          <path d="M 10 45 Q 20 50, 30 45 Q 40 50, 50 45 Q 60 50, 70 45 Q 80 50, 90 45" />

          <rect x="12" y="53" width="76" height="12" rx="6" />

          <path d="M 25 53 L 40 70 L 55 53" />

          <path d="M 16 73 C 16 88, 84 88, 84 73 Z" />
        </g>
      </svg>
    </div>
  );
}
