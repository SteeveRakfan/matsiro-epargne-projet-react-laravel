import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Toggler from "../common/Toggler";
import FullLogo from "../common/FullLogo";
import UserContext from "../../contexts/UserContext";
import ApiService from "../../services/apiService";

// 1. Extraction hors du composant pour éviter la recréation à chaque rendu

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const baseLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/contact-us", label: "Contact Us" },
  ];
  const navigationLinks = !user
    ? [
        ...baseLinks,
        { path: "/login", label: "Log in" },
        { path: "/signup", label: "Sign up" },
      ]
    : [...baseLinks, { label: "Log out", logout: true }];
  const [isNavShown, setIsNavShown] = useState(false);
  

  const closeMenu = () => setIsNavShown(false);
  const logout = async () => {
    await ApiService.logout();
    setUser(null);
  };

  return (
    <nav className="fixed top-0 left-0 z-40 flex items-center justify-between w-full h-14 px-3 bg-white border-b border-gray-300 dark:border-gray-700 dark:bg-gray-800">
      <Link to="/" className="font-semibold text-gray-900 dark:text-white">
        <FullLogo />
      </Link>

      <ul
        className={`flex gap-3 items-center transition-transform duration-300 z-40
    flex-col justify-center fixed top-0 right-0 h-screen w-full bg-white dark:bg-gray-800
    sm:static sm:flex-row sm:h-auto sm:w-auto sm:translate-x-0
    ${isNavShown ? "translate-x-0" : "translate-x-full"}`}
      >
        {navigationLinks.map((link, index) => (
          <li key={index}>
            {link.logout ? (
              <button className="text-red-600 cursor-pointer" onClick={logout}>
                {link.label}
              </button>
            ) : (
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `transition-colors duration-200 ${isActive ? "text-amber-600 font-bold" : "text-gray-600 dark:text-gray-300 hover:text-amber-600"}`
                }
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            )}
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3 z-50">
        {/* Bouton Dark Mode animé */}
        <Toggler
          onClick={() => setIsNavShown((prev) => !prev)}
          className="sm:hidden"
          isOpen={isNavShown}
        />
      </div>
      
    </nav>
  );
}
