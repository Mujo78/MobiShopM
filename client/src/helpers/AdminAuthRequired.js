import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import { Navigate, Outlet } from "react-router-dom";

export default function AdminAuthRequired(){
    const {authState} = useContext(AuthContext);
    const ac = localStorage.getItem("accessToken");

        if(!ac){
            if(authState.RoleId !== 1){
                return (
                    <Navigate to='*' replace />
                )
            }
        }else if(ac){
            if(authState.RoleId !== 1){
                return (
                    <Navigate to='*' replace />
                )
            }
        }

    return <Outlet />
}