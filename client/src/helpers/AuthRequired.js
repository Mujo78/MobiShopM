import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthRequired(){
    const {authState} = useContext(AuthContext);
    

}