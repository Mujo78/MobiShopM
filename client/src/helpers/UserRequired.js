import { useContext, useEffect } from "react";
import {Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function UserRequired(){

    const {authState} = useContext(AuthContext);
    const navigate = useNavigate();
    const ac = localStorage.getItem("accessToken");

    useEffect(() => {
        if(!ac){
            navigate("*")
        }else if(ac && authState.RoleId !== 2){
            navigate("*")
        }

    }, [ac, authState.RoleId])

    return <Outlet />
}