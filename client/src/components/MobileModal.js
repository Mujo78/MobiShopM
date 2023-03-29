import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from "react-bootstrap/Image";
import ListGroup from 'react-bootstrap/ListGroup';
import { AuthContext } from '../helpers/AuthContext';
import { useContext, useEffect, useState } from 'react';
import Form from "react-bootstrap/Form";
import axios from 'axios';
import {toast } from 'react-toastify';
import OrderModal from './OrderModal';


export default function MobileModal(props){

  const {authState} = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const [personInfoState, setPersonInfoState] = useState([]);
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

    useEffect(() =>{
      if(authState.id !== 0){
        axios.get(`http://localhost:3001/person/${authState.id}`)
        .then(response => setPersonInfoState(response.data))
        .catch(error => console.log(error))
      }
      },[authState.id])


  return (
    <Modal show={props.show} onHide={props.onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.data.mobile_name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-wrap flex-row'>
        <Image src={props.data.photo} alt="photo" style={{width:"270px", height:"320px"}} />
        <ListGroup variant="flush">
        <ListGroup.Item><strong>Display:</strong> {props.data.screen_size}"</ListGroup.Item>
        <ListGroup.Item><strong>Internal/RAM:</strong> {props.data.internal}GB {props.data.ram}GB RAM</ListGroup.Item>
        <ListGroup.Item><strong>Processor:</strong> {props.data.processor}</ListGroup.Item>
        <ListGroup.Item><strong>Baterry:</strong> {props.data.battery} mAh</ListGroup.Item>
        <ListGroup.Item><strong>OS:</strong> {props.data.os}</ListGroup.Item>
        <ListGroup.Item><strong>Camera:</strong> {props.data.camera}</ListGroup.Item>
        <ListGroup.Item><strong>Price:</strong> {props.data.price} KM</ListGroup.Item>
      </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        
        {authState.id !== 0 ?
          authState.RoleId !== 1 && 
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
         : <div></div>
         }

        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
      {showOrderModal &&
      <OrderModal 
        show={showOrderModal}
        handleClose={handleClose}
        qnty={quantity}
        data={props.data}
        dataPerson={personInfoState}
        />
      }
    </Modal>
  );
}
