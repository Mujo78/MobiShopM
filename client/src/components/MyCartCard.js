/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../helpers/AuthContext"
import axios from "axios";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Button from "react-bootstrap/esm/Button";
import OrderModal from "./OrderModal";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";

const CustomListGroupItem = styled(ListGroup.Item)
`
    p {
        color: #C0C0C0;
        font-family: sans-serif;
        font-size: 13px;
    }
`

export default function MyCartCard(){

    const {authState, infoPersonState, cartItemsInfo, setCartItemsInfo} = useContext(AuthContext);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const handleClose = () => {
        getCartItemsInfo();
        setShowOrderModal(false);
    }
    const handleShow = () =>{
        getCartItemsInfo(); 
        setShowOrderModal(true)
    };

    const getCartItemsInfo = () => {
        if(authState.id !== 0){
          axios.get(`http://localhost:3001/cart/${authState.id}`, {
            headers: {
              'accessToken': `Bearer ${localStorage.getItem("accessToken")}`
            }
          })
          .then(response => setCartItemsInfo(response.data))
          .catch(error => console.log(error))
        }
      }

      const deleteFromCart = (id) =>{
            
            axios.delete(`http://localhost:3001/delete-item/${id}`, {
              headers:{
                'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
              }
            })
            .then(() =>{
              toast.success("Item is deleted successfully.")
              getCartItemsInfo();
            })
            .catch(error => toast.error(error))
            
      }

      useEffect(() =>{
        getCartItemsInfo();
      }, [])

    return(
        <>
        {cartItemsInfo.length > 0 ?
        <ListGroup className="mb-5" variant="flush" style={{maxHeight:"470px", overflowX: "hidden", overflowY:"auto"}}>
            <CustomListGroupItem className="w-100 justify-content-end p-0 m-0 d-flex flex-wrap">
                            <Row className="d-flex w-75 justify-content-end">
                            <Col style={{flex: "0.15"}}>
                                <p>Price</p>
                            </Col>
                            <Col style={{flex: "0.24"}}>
                                <p>Quantity</p>
                            
                            </Col>
                            <Col style={{flex: "0.15"}}>
                                <p>Total</p>
                        
                            </Col>
                            <Col sm={1}>
                                <p>Buy</p>
                            </Col>
                            <Col sm={2}>
                                <p>Remove</p>
                            </Col>
                            </Row>
                    
            </CustomListGroupItem>
            
                {cartItemsInfo.map(n => (
                <CustomListGroupItem key={n.id} className="w-100 mt-2 mb-2 d-flex justify-content-start align-items-center text-center" style={{border: "1px solid #219aeb", borderRadius: 0}}>
                    <div className="d-flex align-items-center w-25">
                        <Col>
                            <img src={n.photo} alt="img" style={{height: "80px"}} />
                        </Col>
                        <h6 className="ms-3">{n.mobile_name}</h6>
                    </div>
                    <div className="d-flex w-75 align-items-center justify-content-end">
                        <Col sm={2}>
                            <h6>{n.price} KM</h6>
                        </Col>
                        <Col sm={2}>
                            <h6>{n.quantity}</h6>
                        </Col>
                        <Col sm={2}>
                            <h6>{n.price*n.quantity} KM</h6>
                        </Col>
                        <Col sm={1}>
                            <Button style={{backgroundColor: "#219aeb", borderRadius: 0, border: "none"}} onClick={handleShow} >Order</Button>
                        </Col>
                        <Col sm={2}>
                            
                            <Button onClick={() => deleteFromCart(n.id)} style={{backgroundColor: "transparent", border:"none"}}>
                                <FontAwesomeIcon icon={faTimes} style={{color: "#c0c0c0"}} />
                            </Button>
                        </Col>
                    </div>
                    <OrderModal 
            show={showOrderModal}
            handleClose={handleClose}
            qnty={n.quantity}
            data={n}
            dataPerson={infoPersonState}
            />
                </CustomListGroupItem>
        ))} </ListGroup>: 
            <Alert className="mt-5 text-center" variant="secondary">Cart is empty</Alert>
            
        }


       
       </>
    )
}