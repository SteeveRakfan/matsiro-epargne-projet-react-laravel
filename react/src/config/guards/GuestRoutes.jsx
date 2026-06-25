import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Loading from "../../components/common/Loading";
import UserContext from "../../contexts/UserContext";

export default function GuestRoute({ children }) {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'user') {
        navigate('/user');
      }
    }
  }, [navigate, user]);

  if (loading) {
    return <Loading fullPage size="lg" />;
  }

  if (user && user?.role !== 'admin' && user?.role !== 'user') {
    return (
      <div className="absolute left-0 top-0 bg-black w-screen h-screen text-white text-5xl flex items-center justify-center">
        Role not repertoried.
      </div>
    );
  }

  return children ? children : <Outlet />;
}
