import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const DynamicNavbarPath = () => {
  const location = useLocation();
  // Transforme "/expenses/3" en ['expenses', '3']
  const pathnames = location.pathname.split('/').filter((x) => x).slice(1);

  return (
    <div className='flex items-center gap-1 text-slate-400 text-[.8rem]'>
      <Link to="/user" className=''>/</Link>

      {pathnames.map((value, index) => {
        // Construit le lien parent (ex: /expenses)
        const to = `/user/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <span key={to} className='flex items-center gap-1'>
            {isLast ? (
              // Le dernier élément (ex: "3") n'est pas cliquable
              <span style={{ color: '#333' }}>{decodeURIComponent(value)}</span>
            ) : (
              // Les éléments intermédiaires (ex: "expenses") sont cliquables
              <>
                <Link to={to} className='text-[#5d89b7]'>
                  {decodeURIComponent(value)}
                </Link>
                {/* Ajoute le séparateur "/" après le lien */}
                <span style={{ color: '#666' }}>/</span>
              </>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default DynamicNavbarPath;
