import { useEffect } from "react";

export default function ThemeTrigger({ onTrigger }) {
  useEffect(() => {
    const handleMouseMove = (event) => {
      const isAtRightEdge = window.innerWidth - event.clientX <= 70;
      const isAtTargetY =
        Math.abs(event.clientY - Math.trunc((window.innerHeight * 30) / 100)) <=
        40;

      if (isAtRightEdge && isAtTargetY) {
        onTrigger(true); // Afficher
      } else {
        onTrigger(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [onTrigger]);

  return null;
}
