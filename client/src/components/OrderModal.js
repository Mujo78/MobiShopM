/* eslint-disable no-unused-vars */
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {useState } from 'react';
import Form from "react-bootstrap/Form";
import FormGroup from 'react-bootstrap/esm/FormGroup';
import { toast } from 'react-toastify';

export default function OrderModal(props){  

  const [infoFormState , setInfoFormState] = useState({
    name: props.dataPerson.first_name,
    lastName: props.dataPerson.last_name,
    city: props.dataPerson.city,
    address: props.dataPerson.address,
    deviceName: props.data.mobile_name,
    quantity: props.qnty,
    totalCost: props.qnty * props.data.price
  })

  const [orderInfoState, setOrderInfoState] = useState({
    payment_info: "Delivery",
    qnty: props.qnty
  })
  const handleChange = (event) =>{
    const {name, value} = event.target;
    
    setOrderInfoState(n => ({
      ...n,
      [name]:value
    }))
  }

  const BuyIt = () =>{
    
    axios.post(`http://localhost:3001/buy-now-route/${props.data.id}`, orderInfoState, {
      headers:{
        'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
    .then(() =>{
      toast.success("Product(s) succesifully ordered.");
      props.handleClose();

    }).catch(error => console.log(error))
    }

    return(
        <Modal show={props.show} onHide={props.handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Order details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='d-flex'>
            <div className='w-100 me-2'>
          <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              disabled
              name='name'
              value={infoFormState.name}
            >
            </Form.Control>
            </div>
            <div className='w-100 ms-2'>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type='text'
              disabled
              name='lastName'
              value={infoFormState.lastName}
            >
            </Form.Control>
            </div>
          </Form.Group>
          <Form.Group className='d-flex mt-2'>
            <div className='w-100 me-2'>
          <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              disabled
              name='city'
              value={infoFormState.city}
            >
            </Form.Control>
            </div>
            <div className='w-100 ms-2'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              disabled
              name='address'
              value={infoFormState.address}
            >
            </Form.Control>
            </div>
          </Form.Group>
          <Form.Group className='d-flex mt-2'>
            <div className='w-100'>
          <Form.Label>Device name</Form.Label>
            <Form.Control
              type='text'
              disabled
              name='deviceName'
              value={infoFormState.deviceName}
            >
            </Form.Control>
            </div>
          </Form.Group>
          <Form.Group className='d-flex mt-2'>
            <div className='w-100 me-2'>
          <Form.Label>Quantity</Form.Label>
            <Form.Control
              type='text'
              disabled
              name='quantity'
              value={infoFormState.quantity}
            >
            </Form.Control>
            </div>
            <div className='w-100 ms-2'>
            <Form.Label>Total cost</Form.Label>
            <Form.Control
              type='text'
              disabled
              name='totalCost'
              value={infoFormState.totalCost}
            >
            </Form.Control>
            </div>
          </Form.Group>
          <FormGroup className='d-flex justify-content-around'>
            <div className='d-flex flex-column align-items-center'>
              <img src='./images/shipping.png'  alt='shipping' />
            <Form.Check
               type="radio" 
               label="While delivery"
               name='payment_info'
               value="Delivery"
               onChange={handleChange}
               checked={orderInfoState.payment_info === "Delivery"}
              />
            </div>
            <div className='d-flex flex-column align-items-center'>
            <img src='./images/creditcard.png' alt='card' />
              <Form.Check
                disabled
                type="radio"
                label="Credit card"
                name='payment_info'
                value='Card'
                onChange={handleChange}
                checked={orderInfoState.payment_info === "Card"}
              />
              
            </div>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={BuyIt}>
            Order
          </Button>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
}