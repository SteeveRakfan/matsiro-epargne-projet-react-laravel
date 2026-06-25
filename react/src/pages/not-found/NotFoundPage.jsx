import React from "react";
import { Link } from "react-router-dom"; // Remplacez par <a> si vous n'utilisez pas react-router
import ErrorSVG1 from "../../components/common/ErrorSVG1";
export default function NotFoundPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-black p-5 text-center font-sans select-none overflow-hidden">
      {/* Conteneur du SVG Animé */}
      <ErrorSVG1 />

      {/* Textes en anglais */}
      <h1 className="m-0 text-8xl font-black tracking-tighter text-white sm:text-9xl">
        404
      </h1>

      <p className="m-0 text-sm font-medium tracking-[0.2em] text-neutral-400 uppercase sm:text-base">
        Lost in the deep dark web.
      </p>

      <p className="mt-2 mb-8 max-w-sm text-sm leading-relaxed text-neutral-600">
        The page you are looking for doesn't exist or has been moved to another
        coordinate.
      </p>

      {/* Bouton avec effet d'inversion au survol */}
      <Link
        to="/"
        className="rounded border border-neutral-800 bg-neutral-950 px-6 py-3 text-sm font-medium text-white no-underline transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
      >
        Go Back Home
      </Link>
    </div>
  );
}
