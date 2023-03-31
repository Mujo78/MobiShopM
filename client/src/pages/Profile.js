import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
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

export default function Profile(){

    const {authState} = useContext(AuthContext);
    const {isMobile} = useResponsive();

    //Need to make it work!
    const logOutFunction = () => {
        console.log("Log outted");
    }

    const deleteMyAcc = () => {
        console.log("Delete acc")
    }

    return(
        <div>
            <Container fluid className="w-100" style={{backgroundColor:"#DCDCDC", fontFamily:"sans-serif" }}>
                <div className="mt-3 pt-5 ps-5 pb-5">
                    <h1>Ime Prezime</h1>
                    <CustomDiv className="ctn d-flex">
                        <h5>Grad, Adresa</h5>
                        <Button onClick={logOutFunction} className={`btn ms-auto ${isMobile ? `me-0 mt-1` : `me-5`}`}>Log out</Button>
                    </CustomDiv>
                </div>
            </Container>

            <Container className="d-flex w-100">
                <div className="w-25">
                    <ListGroup className="mt-5 w-100">
                        <ListGroup.Item className="text-center w-100" as={NavLink} end to={`.`} style={{borderRadius: "0px",marginBottom:"1px", border:"none"}} variant="secondary" action>Profile</ListGroup.Item>
                        <ListGroup.Item className="text-center w-100" as={NavLink} end to={`edit-profile`} style={{borderRadius: "0px",marginBottom:"1px", border:"none"}} variant="secondary" action>Edit profile</ListGroup.Item>
                        {authState.RoleId !==1 && <> 
                            <ListGroup.Item className="text-center w-100" as={NavLink} to={`my-cart`} style={{borderRadius: "0px",marginBottom:"1px", border:"none"}} variant="secondary" action>Cart</ListGroup.Item>
                            <ListGroup.Item className="text-center w-100" as={NavLink} to={`orders`} style={{borderRadius: "0px",marginBottom:"1px", border:"none"}} variant="secondary" action>Orders</ListGroup.Item> </>
                        }<ListGroup.Item className="text-center w-100" as={NavLink} to={`wishlist`} style={{borderRadius: "0px",marginBottom:"1px", border:"none"}} variant="secondary" action>Wishlist</ListGroup.Item>
                        <ListGroup.Item className="text-center w-100" as={NavLink} end to={`detail-activities`} style={{borderRadius: "0px",marginBottom:"1px", border:"none"}} variant="secondary" action>Activities</ListGroup.Item>
                        <ListGroup.Item className="text-center w-100" onClick={deleteMyAcc}  as={Button} style={{borderRadius: "0px", border:"none"}} variant="danger" action>Delete account</ListGroup.Item>
                    </ListGroup>
                </div>
                <div className="W-75 mx-auto mt-5">
                    <Outlet />
                </div>
        </Container>
        </div>
    )
}