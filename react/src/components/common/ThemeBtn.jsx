import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import ThemeTrigger from "../common/abstract/ThemeTrigger";

export default function ThemeBtn() {
  const [isThemeBtnVisible, setIsThemeBtnVisible] = useState(false);
  const toggleDarkMode = () => setIsDark((prev) => !prev);
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);
  return (
    <div>
      <button
        onClick={toggleDarkMode}
        className={`cursor-pointer fixed z-50 top-[30vh] right-2 p-3 shadow-2xl -translate-y-1/2 rounded-full bg-gray-300 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-gray-700 transition-all duration-500 ease-out
      ${
        isThemeBtnVisible
          ? "translate-x-0 opacity-100 scale-100"
          : "translate-x-20 opacity-0 scale-50 pointer-events-none"
      }`}
        aria-label="Toggle theme"
      >
        {isDark ? (
          <FaSun className="text-amber-600" />
        ) : (
          <FaMoon className="text-gray-600" />
        )}
      </button>
<div className={`cursor-pointer fixed z-50 top-[30vh] right-0 h-10 w-4 translate-x-full -translate-y-1/2 rounded-full shadow-[2px_0_10px_1px_#159604]`}></div>
      <ThemeTrigger onTrigger={(value) => setIsThemeBtnVisible(value)} />
    </div>
  );
}
