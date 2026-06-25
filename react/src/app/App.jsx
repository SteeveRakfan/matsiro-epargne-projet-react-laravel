import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ThemeBtn from "../components/common/ThemeBtn";

export default function App() {
  const location = useLocation();
  const pathname = location.pathname;

  // Calcul direct pendant le rendu (pas besoin de state ni de useEffect)
  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/signup");
  const isConnected =
    pathname.startsWith("/user") || pathname.startsWith("/admin");

  return (
    <div className="font-inter dark:bg-gray-950 dark:text-white min-h-screen">
      {/* On affiche le Header SEULEMENT si on n'est PAS sur une page auth */}
      {!isAuthPage && !isConnected && <Header />}

      <main>
        <Outlet />
      </main>

      {/* On affiche le Footer SEULEMENT si on n'est PAS sur une page auth */}
      {!isAuthPage && !isConnected && <Footer />}
      <ToastContainer />
      <ThemeBtn />
    </div>
  );
}
