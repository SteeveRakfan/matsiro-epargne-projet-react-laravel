import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import Search1 from "../../common/Search1";
import Profile1 from "../../common/Profile1";
import {
  FaBoxOpen,
  FaChartLine,
  FaChartPie,
  FaClipboardList,
  FaReceipt,
} from "react-icons/fa";
import { FaScaleBalanced } from "react-icons/fa6";

export const STitle = ({ title }) => {
  return (
    <h2 className="text-xs font-bold tracking-wider text-emerald-700 dark:text-emerald-400/80 mb-2 opacity-85">
      {title}
    </h2>
  );
};

export const STab = ({ tab, onClick }) => {
  return (
    <li key={tab.label} className="mb-1">
      <Link
        to={tab.path}
        onClick={onClick}
        className="flex items-center gap-3 px-3 py-2 rounded-lg text-[0.92rem] font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-all duration-200 group"
      >
        {/* L'icône change de couleur de manière fluide au survol */}
        <span className="text-base text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {tab.icon}
        </span>
        <span>{tab.label}</span>
      </Link>
    </li>
  );
};
export default function AuthApp() {
  const { user } = useContext(UserContext);
  const [userRole, setUserRole] = useState(user?.role)
  const leftSections = [
    {
      title: `OVERVIEW & CONTROL`,
      tabs: [{ label: `Dashboard`, path: `/${userRole}`, icon: <FaChartPie /> }],
    },
    {
      title: `FINANCE & BUDGET`,
      tabs: [
        { label: `Expenses`, path: `/${userRole}/expenses`, icon: <FaReceipt /> },
        { label: `Budgets`, path: `/${userRole}/budgets`, icon: <FaScaleBalanced /> },
      ],
    },
    {
      title: `SHOPPING`,
      tabs: [
        {
          label: `Market Prices`,
          path: `/${userRole}/market_prices`,
          icon: <FaChartLine />,
        },
        {
          label: `Shopping Lists`,
          path: `/${userRole}/shopping_lists`,
          icon: <FaClipboardList />,
        },
      ],
    },
    {
      title: `HOME & INVENTORY`,
      tabs: [{ label: `Pantry`, path: `/${userRole}/pantry`, icon: <FaBoxOpen /> }],
    },
  ];
  const [leftBarShown, setLeftBarShown] = useState(false);
  const zipRef = useRef(null);
  const leftBarRef = useRef(null);
  return (
    // 'dark' à la racine de la div pour tester/activer facilement le mode sombre si besoin
    <div className="h-screen bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      <div className="grid grid-cols-12">
        {/* Sidebar moderne optimisée light et dark */}
        <div
          ref={leftBarRef}
          className={`fixed left-0 top-0 ${!leftBarShown && "-translate-x-full"} lg:translate-x-0 transition z-50 lg:relative lg:col-span-2 h-screen overflow-y-auto border-e border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900`}
        >
          <div className="flex h-full overflow-y-auto flex-col gap-7 p-4">
            <Profile1 user={user} />
            <Search1 />
            <nav className="flex flex-col gap-5">
              {leftSections.map((section) => (
                <section key={section.title}>
                  <STitle title={section.title} />
                  <ul className="flex flex-col">
                    {section.tabs.map((tab, index) => (
                      <STab key={index} tab={tab} onClick={() => setLeftBarShown(false)} />
                    ))}
                  </ul>
                </section>
              ))}
            </nav>
          </div>
          <button onClick={() => setLeftBarShown(false)} className="absolute top-1/2 right-3 -translate-y-1/2 h-12 w-6 rounded-l-full rounded-r-full bg-gray-200 cursor-pointer hover:bg-gray-200/60 transition"></button>
        </div>
        {/* Contenu principal adaptatif */}
        <div className="col-span-12 lg:col-span-10 h-screen overflow-y-auto bg-white dark:bg-slate-950 transition text-slate-900 dark:text-slate-100 relative">
          <Outlet />
          <div
            ref={zipRef}
            onClick={()=>setLeftBarShown(true)}
            className={`cursor-pointer h-32 w-4 transition fixed z-50 left-0 top-1/2 ${leftBarShown ? '-translate-x-full':'-translate-x-1/2 hover:translate-x-0'} -translate-y-1/2 bg-gray-300 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:shadow hover:shadow-emerald-600/60 rounded-r-full `}
          >
            <div className="h-10/12 w-0.5 bg-gray-900/20 rounded-full shadow absolute top-1/2 -translate-y-1/2 left-1/4"></div>
            <div className="h-8/12 w-0.5 bg-gray-900/20 rounded-full shadow absolute top-1/2 -translate-y-1/2 left-2/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
