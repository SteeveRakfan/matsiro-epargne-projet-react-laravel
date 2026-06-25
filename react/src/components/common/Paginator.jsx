import React from 'react';
import { LuChevronLeft,LuChevronRight, LuEllipsis } from 'react-icons/lu';

export default function Paginator({ paginationData, onPageChange }) {
  if (!paginationData || paginationData.last_page <= 1) return null;

  const { current_page, last_page, links } = paginationData;

  // Filtrer les liens pour exclure "Précédent" et "Suivant" du milieu du tableau
  const pageLinks = links.filter(link => !link.label.includes('Previous') && !link.label.includes('Next'));

  return (
    <nav 
      className="flex items-center justify-between border-t border-slate-100 bg-white px-4 py-3 sm:px-6 dark:border-slate-800 dark:bg-slate-900"
      aria-label="Pagination"
    >
      {/* Version Mobile : Simple et efficace */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => current_page > 1 && onPageChange(current_page - 1)}
          disabled={current_page === 1}
          className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 active:scale-95 disabled:pointer-events-none disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          Précédent
        </button>
        <button
          onClick={() => current_page < last_page && onPageChange(current_page + 1)}
          disabled={current_page === last_page}
          className="ml-3 inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 active:scale-95 disabled:pointer-events-none disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          Suivant
        </button>
      </div>

      {/* Version Desktop : Design Premium ultra-moderne */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        {/* Texte informatif discret */}
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Page <span className="font-semibold text-slate-900 dark:text-white">{current_page}</span> sur{' '}
            <span className="font-semibold text-slate-900 dark:text-white">{last_page}</span>
          </p>
        </div>

        {/* Boutons de navigation */}
        <div>
          <div className="inline-flex -space-x-px rounded-2xl bg-slate-50 p-1 dark:bg-slate-800/50" aria-label="Pagination">
            
            {/* Bouton Précédent */}
            <button
              onClick={() => onPageChange(current_page - 1)}
              disabled={current_page === 1}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-all hover:bg-white hover:text-slate-900 hover:shadow-sm active:scale-90 disabled:pointer-events-none disabled:opacity-30 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <span className="sr-only">Précédent</span>
              <LuChevronLeft className="h-4 w-4" />
            </button>

            {/* Liste des numéros de page dynamique */}
            {pageLinks.map((link, index) => {
              // Gestion des ellipses Laravel (les "...")
              if (link.url === null && link.label === '...') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="inline-flex h-9 w-9 items-center justify-center text-slate-400 dark:text-slate-500"
                  >
                    <LuEllipsis className="h-4 w-4" />
                  </span>
                );
              }

              const isCurrent = link.active;
              // Extraction du numéro de page depuis l'URL de Laravel ou le label
              const pageNumber = parseInt(link.label, 10);

              return (
                <button
                  key={`page-${index}`}
                  onClick={() => onPageChange(pageNumber)}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 active:scale-90 ${
                    isCurrent
                      ? 'bg-white text-blue-600 shadow-sm shadow-blue-500/5 dark:bg-slate-700 dark:text-blue-400'
                      : 'text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-xs dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* Bouton Suivant */}
            <button
              onClick={() => onPageChange(current_page + 1)}
              disabled={current_page === last_page}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-all hover:bg-white hover:text-slate-900 hover:shadow-sm active:scale-90 disabled:pointer-events-none disabled:opacity-30 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <span className="sr-only">Suivant</span>
              <LuChevronRight className="h-4 w-4" />
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
}
