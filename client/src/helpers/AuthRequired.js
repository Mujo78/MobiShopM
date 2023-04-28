import { redirect, Outlet } from "react-router-dom";

export default function AuthRequired(){
    
    const isLoggedIn = localStorage.getItem("accessToken");

    if(!isLoggedIn){
        return(
            redirect("*")
        )
    }

    return <Outlet />
}