import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Loading from "../../components/common/Loading"

export default function ProtectedRoutes({ allowedRoles = [], children=null}) {
    const {user, loading} = useContext(UserContext);
    const navigate = useNavigate();

    if(loading){
        return <Loading fullPage />;
    }
    if(!user){
        return <Navigate to="/login" replace/>
    }
    if(allowedRoles.length==0 || allowedRoles.includes(user.role)){
        return children ? children : <Outlet />
    }else if(!allowedRoles.includes(user.role)){
        navigate(-1);
    }
}
