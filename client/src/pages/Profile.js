import { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from '../helpers/AuthContext';
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import styled from "styled-components";
import useResponsive from "../components/useResponsive";
import ListGroup from "react-bootstrap/ListGroup";


const CustomDiv = styled.div
`
    .btn {
        border-radius: 0;
        border: 3px solid;
        background-color: #219aeb;
    }

    .btn:hover {
        border-color: #219aeb;
        background-color: #ffffff;
        color: #219aeb;
    }
`

export default function Profile(props){

    const {authState, infoPersonState, setAuthState} = useContext(AuthContext);
    const {isMobile} = useResponsive();
    const navigate = useNavigate();

    useEffect(() =>{
        if(!localStorage.getItem("accessToken")){
            navigate("/")
        }
    }, [navigate])

    //Need to make it work!
    function logOutFunction(){
        localStorage.removeItem("accessToken");
        setAuthState({
            id: 0,
            username: "",
            RoleId:0
        });
        navigate("/");
    }

    const deleteMyAcc = () => {
        console.log("Delete acc")
    }
    const name = infoPersonState.first_name + " " + infoPersonState.last_name;

    const styles = {
        borderRadius: "0px",
        marginBottom:"1px",
        border:"none"
    }
    return(
        <div>
            <Container fluid className="w-100" style={{backgroundColor:"#DCDCDC", fontFamily:"sans-serif" }}>
                <div className="mt-3 pt-5 ps-5 pb-5">
                    <h1>{name}</h1>
                    <CustomDiv className="ctn d-flex">
                        <h5>{infoPersonState.city}, {infoPersonState.address}</h5>
                        <Button onClick={logOutFunction} className={`btn ms-auto ${isMobile ? `me-0 mt-1` : `me-5`}`}>Log out</Button>
                    </CustomDiv>
                </div>
            </Container>

            <Container className="d-flex w-100">
                <div className="w-25">
                    <ListGroup className="mt-5 w-100">
                        <ListGroup.Item className="text-center w-100" as={NavLink} end to={`.`} style={styles} variant="secondary" action>Profile</ListGroup.Item>
                        <ListGroup.Item className="text-center w-100" as={NavLink} end to={`edit-profile`} style={styles} variant="secondary" action>Edit profile</ListGroup.Item>
                        {authState.RoleId !==1 && <> 
                            <ListGroup.Item className="text-center w-100" as={NavLink} to={`my-cart`} style={styles} variant="secondary" action>Cart</ListGroup.Item>
                            <ListGroup.Item className="text-center w-100" as={NavLink} to={`orders`} style={styles} variant="secondary" action>Orders</ListGroup.Item> </>
                        }<ListGroup.Item className="text-center w-100" as={NavLink} to={`wishlist`} style={styles} variant="secondary" action>Wishlist</ListGroup.Item>
                        <ListGroup.Item className="text-center w-100" onClick={deleteMyAcc}  as={Button} style={{borderRadius: "0px", border:"none"}} variant="danger" action>Delete account</ListGroup.Item>
                    </ListGroup>
                </div>
                <div className="w-75 mx-auto mt-5 ms-5">
                    <Outlet />
                </div>
        </Container>
        </div>
    )
}