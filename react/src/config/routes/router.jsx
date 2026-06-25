import { createBrowserRouter } from "react-router-dom";
import App from "../../app/App";
import NotFoundPage from "../../pages/not-found/NotFoundPage";
import HomePage from "../../pages/home/HomePage";
import AboutPage from "../../pages/about/AboutPage";
import ContactUs from "../../pages/contact-us/ContactUs";
import LogIn from "../../pages/auth/LogIn";
import SignUp from "../../pages/auth/SignUp";
import GuestRoute from "../guards/GuestRoutes";
import userRoutes from "./userRoutes";
import adminRoutes from "./adminRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        element: <GuestRoute />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "login",
            element: <LogIn />,
          },
          {
            path: "signup",
            element: <SignUp />,
          },
        ],
      },
    ].concat(userRoutes, adminRoutes),
  },
]);
