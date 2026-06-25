import React, { useEffect, useRef } from "react";
import Card from "./Card";
import { FaX } from "react-icons/fa6";

export default function Modal({ isShown, onClose, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Correction : utilisation de e au lieu de event
      const isAtRightEdge = window.innerWidth - e.clientX <= 70;
      const isAtTargetY =
        Math.abs(e.clientY - Math.trunc((window.innerHeight * 30) / 100)) <= 40;

      if (
        modalRef.current &&
        isShown &&
        !modalRef.current.contains(e.target) &&
        !(isAtRightEdge && isAtTargetY)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShown, onClose]);

  if (!isShown) return false; // Plus propre que de retourner un "Non" absolu au milieu de l'écran

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/30 z-50">
      <Card
        ref={modalRef} // Correction du ref
        className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-11/12  lg:w-5/12 p-3 z-40 overflow-y-auto transition"
      >
        {children}
        <button
          onClick={onClose}
          className="cursor-pointer hover:scale-120 transition absolute top-3 right-3"
        >
          <FaX />
        </button>
      </Card>
    </div>
  );
}
