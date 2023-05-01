import { useContext, useEffect } from "react"
import { AuthContext } from "./AuthContext"
import { Outlet, useNavigate } from "react-router-dom";

export default function AdminAuthRequired(){
    const {authState} = useContext(AuthContext);
    const ac = localStorage.getItem("accessToken");

    const navigate = useNavigate();

        useEffect(() => {
            if(!ac){
                navigate("*")
            }else if(ac && authState.RoleId !== 1){
                navigate("*")
            }
    
        }, [ac])

        return <Outlet />
}