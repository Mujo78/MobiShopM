/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Col from "react-bootstrap/Col";
import { AuthContext } from '../helpers/AuthContext';
import Row from 'react-bootstrap/esm/Row';
import Container from "react-bootstrap/Container";

export default function OrderInfo({show, handleClose, dataId, setIds}){


    const [data, setData] = useState([]);
    const {infoPersonState} = useContext(AuthContext);
    const {first_name, last_name} = infoPersonState;

    const getData = () => {
        if(dataId !== 0){
            axios.get(`http://localhost:3001/order-item/${dataId}`, {
                headers:{
                    'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
                  }
            })
            .then(response => {
                setData(response.data);
                setIds(0);
            })
            .catch(error => toast.error(error))
        }
    }

    useEffect(() =>{
        getData();
    }, [dataId, setIds])

        const date = data.length !== 0 && data.order_date.slice(0,10);

    return(
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Order details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container>
          <Row>
            <Col>
                {first_name + " " + last_name}
            </Col>
            <Col sm={4}>
                Date: {date}
            </Col>
          </Row>
           <Row>
                <Col>
                    {data.shipping_address}
                </Col>
                <Col sm={4}>
                    Payment: <strong>{data.payment_info}</strong>
                </Col>
            </Row>

            
            <Row className='mt-5'>
                <Col>
                   <h5>
                    {data.mobile_name}
                    </h5>
                   <hr/>
                </Col>
                
                <Col sm={2}>
                    Q: <strong> {data.Quantity}</strong>
                    <hr/>
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col>
                Order status: <strong>{data.order_status}</strong>
                </Col>
            </Row>
            <Row className='mt-2'>
                <Col>
                </Col>
            </Row>

                </Container>
      
        </Modal.Body>
        <Modal.Footer>
            <Row>
                <Col>
                    Total cost: <strong>{data.total_cost} KM</strong>
                </Col>
            </Row>
        </Modal.Footer>
        
      </Modal>
    )
}