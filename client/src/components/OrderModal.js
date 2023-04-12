/* eslint-disable no-unused-vars */
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {useEffect, useState } from 'react';
import Form from "react-bootstrap/Form";
import FormGroup from 'react-bootstrap/esm/FormGroup';
import { toast } from 'react-toastify';
import Container from 'react-bootstrap/esm/Container';

export default function OrderModal({dataPerson, data,qntys, show, handleClose}){  

  console.log(data.quantity)
  const [orderInfoState, setOrderInfoState] = useState({
    payment_info: "Delivery",
    qnty: qntys === null ? data.quantity : qntys
  })
  const handleChange = (event) =>{
    const {name, value} = event.target;
    
    setOrderInfoState(n => ({
      ...n,
      [name]:value
    }))
  }

  const BuyIt = (id) =>{
    
    axios.post(`http://localhost:3001/buy-now-route/${id}`, orderInfoState, {
      headers:{
        'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
    .then(() =>{
      toast.success("Product(s) succesifully ordered.");
      handleClose();

    }).catch(error => console.log(error))
    }

    const btnStyle ={
      backgroundColor: "#219aeb",
      border: "none",
      borderRadius: 0
    }

    

    return(
        <Modal 
            show={show} 
            onHide={handleClose}
            animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Order details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='d-flex'>
            <Container className='p-0 w-100'>
          <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              disabled
              name='name'
              value={dataPerson.first_name}
            >
            </Form.Control>
            </Container>
            <Container className='w-100 ms-2 p-0'>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type='text'
              disabled
              name='lastName'
              value={dataPerson.last_name}
            >
            </Form.Control>
            </Container>
          </Form.Group>
          <Form.Group className='d-flex mt-2'>
            <Container className='w-100 p-0'>
          <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              disabled
              name='city'
              value={dataPerson.city}
            >
            </Form.Control>
            </Container>
            <Container className='w-100 p-0 ms-2'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              disabled
              name='address'
              value={dataPerson.address}
            >
            </Form.Control>
            </Container>
          </Form.Group>
          <Form.Group className='d-flex mt-2'>
            <Container className='w-100 p-0'>
          <Form.Label>Device name</Form.Label>
            <Form.Control
              type='text'
              disabled
              name='deviceName'
              value={data.mobile_name}
            >
            </Form.Control>
            </Container>
          </Form.Group>
          <Form.Group className='d-flex mt-2'>
            <Container className='w-100 p-0'>
          <Form.Label>Quantity</Form.Label>
            <Form.Control
              type='text'
              disabled
              name='quantity'
              value={qntys === null ? data.quantity : qntys}
            >
            </Form.Control>
            </Container>
            <Container className='w-100 p-0 ms-2'>
            <Form.Label>Total cost</Form.Label>
            <Form.Control
              type='text'
              disabled
              name='totalCost'
              value={data.price * (qntys === null ? data.quantity : qntys)}
            >
            </Form.Control>
            </Container>
          </Form.Group>
          <FormGroup className='d-flex justify-content-around'>
            <Container className='d-flex p-0 flex-column align-items-center'>
              <img src='/images/shipping.png'  alt='shipping' />
            <Form.Check
               type="radio" 
               label="While delivery"
               name='payment_info'
               value="Delivery"
               onChange={handleChange}
               checked={orderInfoState.payment_info === "Delivery"}
              />
            </Container>
            <Container className='p-0 d-flex flex-column align-items-center'>
            <img src='/images/creditcard.png' alt='card' />
              <Form.Check
                disabled
                type="radio"
                label="Credit card"
                name='payment_info'
                value='Card'
                onChange={handleChange}
                checked={orderInfoState.payment_info === "Card"}
              />
              
            </Container>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => BuyIt(data.id)} style={btnStyle}>
            Order
          </Button>
          <Button variant="secondary" onClick={handleClose} style={{borderRadius: 0}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
}