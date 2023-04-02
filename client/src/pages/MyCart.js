import MyCartCard from "../components/MyCartCard";
import { AuthContext } from '../helpers/AuthContext';
import { useContext } from "react";


export default function MyCart(){
    
    const {cartItemsInfo} = useContext(AuthContext);

    return(
        <>
        <h3>My Cart</h3>
        <p style={{fontSize: "13px"}}>{cartItemsInfo.length} {cartItemsInfo.length > 1 ? "ITEMS" : "ITEM"}</p>
            <MyCartCard />
        </>
        
    )
}