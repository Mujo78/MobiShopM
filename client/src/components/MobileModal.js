import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from "react-bootstrap/Image";
import ListGroup from 'react-bootstrap/ListGroup';
import { AuthContext } from '../helpers/AuthContext';
import { useContext, useState } from 'react';
import Form from "react-bootstrap/Form";
import axios from 'axios';
import {toast } from 'react-toastify';


export default function MobileModal(props){

  const {authState} = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);

  const [showOrderModal, setShowOrderModal] = useState(false);

  const handleClose = () => setShowOrderModal(false);

  const handleQuantity = (event) =>{
    const value = event.target.value;
    setQuantity(value);
  }

    const addToCart = (id) =>{
        axios.post(`http://localhost:3001/add-to-cart/${id}`, {quantity}, {
          headers:{
              'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
          }
        })
        .then(() => toast.success("Product succesifully added to cart!"))
        .catch(error => {
            if(error.response.data.errors){
              toast.error(error.response.data.errors)
            }else{
              toast.error(error.response.data)
            }
        })
    }

    const orderMobile = () => {
      setShowOrderModal(true);
    }


  return (
    <Modal show={props.show} onHide={props.onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.data.naziv}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-wrap flex-row'>
        <Image src={props.data.photo} alt="photo" style={{width:"270px", height:"320px"}} />
        <ListGroup variant="flush">
        <ListGroup.Item>Display: {props.data.velicinaEkrana}"</ListGroup.Item>
        <ListGroup.Item>{props.data.internal}GB {props.data.ram}GB RAM</ListGroup.Item>
        <ListGroup.Item>Processor: {props.data.procesor}</ListGroup.Item>
        <ListGroup.Item>Baterry: {props.data.baterija} mAh</ListGroup.Item>
        <ListGroup.Item>OS: {props.data.os}</ListGroup.Item>
        <ListGroup.Item>Camera: {props.data.kamera}</ListGroup.Item>
        <ListGroup.Item>Price: {props.data.cijena} KM</ListGroup.Item>
      </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        
        {authState.RoleId !== 1 && 
          <>
        <Form.Control 
          type="number"
          className='w-25'
          placeholder="Quantity"
          min={1}
          defaultValue={1}
          max={10}
          onChange={handleQuantity} />
         <Button onClick={() => addToCart(props.data.id)}>Add to cart</Button>
         <Button onClick={() => orderMobile()}>Buy now</Button>
         </>
         }

        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
