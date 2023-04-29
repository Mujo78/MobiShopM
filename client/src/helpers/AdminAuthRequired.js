import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import { Outlet, redirect } from "react-router-dom";

export default function AdminAuthRequired(){
    const {authState} = useContext(AuthContext);
    const ac = localStorage.getItem("accessToken");

        if(!ac){
            if(authState.RoleId !== 1){
                redirect("*")
            }
        }else if(ac){
            if(authState.RoleId !== 1){
                redirect("*")
            }
        }

    return <Outlet />
}