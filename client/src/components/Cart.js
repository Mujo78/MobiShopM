/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useContext, useEffect, useState} from 'react';
import Button from 'react-bootstrap/esm/Button';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { toast } from 'react-toastify';
import { AuthContext } from '../helpers/AuthContext';
import Alert from "react-bootstrap/Alert";
import OrderModal from './OrderModal';
import { Image } from './Nav';


export default function Cart({show, onHide, personData, refreshData}){

  const {authState, cartItemsInfo} = useContext(AuthContext);
  const [showOrderForMobile, setShowOrderForMobile] = useState(false);
  const [specificPhone, setSpecificPhone] = useState(null);

  const deleteItem = (id) =>{
    console.log("Deleted " + id);
    
    axios.delete(`http://localhost:3001/delete-item/${id}`, {
      headers:{
        'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
    .then(() =>{
      toast.success("Item is deleted successfully.")
      refreshData(authState.id);
    })
    .catch(error => toast.error(error))
    
  }
  useEffect(() => {
    refreshData(authState.id);
  }, [authState.id, showOrderForMobile])

  const orderSpecificPhone = (n) =>{
    setSpecificPhone(n);
    setShowOrderForMobile(true);
  }
  const handleCloseOrderSpecificPhone = () => {
    setShowOrderForMobile(false)
  };

  console.log(specificPhone);

  const btnStyle ={
      backgroundColor: "#219aeb",
      border: "none",
      borderRadius: 0
  }

    return(
      <Offcanvas show={show} onHide={onHide}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className='mx-auto'>My cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className='d-flex flex-column'>
        {authState.id === 0 ? <Alert variant='secondary' className='m-auto'>You have to be logged in to see your cart!</Alert> : 
          cartItemsInfo.length !== 0 ?
          <ListGroup>
          {cartItemsInfo.map(n => (
              <ListGroup.Item key={n.id} className='mt-2' style={{border: "1px solid #C0C0C0"}}>
                  <h6>{n.mobile_name} ({n.internal}/{n.ram} GB)</h6>
                  <div className='d-flex'>
                  <Button className='me-1' onClick={()=>orderSpecificPhone(n)} style={btnStyle}>Order</Button>
                  <h3 className='mx-auto'>Q: {n.quantity}</h3>
                  <Button className='ms-auto' onClick={() => deleteItem(n.id)} style={{backgroundColor: "transparent", border:"none"}} >
                    <Image src="/images/trash.png" alt="trash" style={{height: "20px"}} />
                  </Button>
                  </div>
                  {showOrderForMobile &&
                    <OrderModal 
                      show={showOrderForMobile}
                      handleClose={handleCloseOrderSpecificPhone}
                      data={specificPhone}
                      dataPerson={personData}
                      />}
              </ListGroup.Item>

          ))}
            </ListGroup> : <Alert variant='secondary' className='text-center mt-5'>Empty</Alert>
        }
      </Offcanvas.Body>
        <Offcanvas.Header>
          <Button onClick={onHide} style={btnStyle} className='w-100'>Continue shopping</Button>
        </Offcanvas.Header>
    </Offcanvas>
    )
}