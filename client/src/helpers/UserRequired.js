import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function UserRequired(){

    const {authState} = useContext(AuthContext);
    const ac = localStorage.getItem("accessToken");

        if(!ac){
            if(authState.RoleId !== 2){
                return (
                    <Navigate to='*' />
                )
            }
        }else if(ac){
            if(authState.RoleId !== 2){
                return (
                    <Navigate to='*' />
                )
            }
        }

    return <Outlet />
}