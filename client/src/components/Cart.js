import axios from 'axios';
import { useContext} from 'react';
import Button from 'react-bootstrap/esm/Button';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { toast } from 'react-toastify';
import { AuthContext } from '../helpers/AuthContext';
import Alert from "react-bootstrap/Alert";


export default function Cart(props){

  const {authState} = useContext(AuthContext);

  const deleteItem = (id) =>{
    axios.delete(`http://localhost:3001/delete-item/${id}`, {
      headers:{
        'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
    .then(toast.success("Item is deleted successfully."))
    .catch(error => toast.error(error))
  }

    return(
      <Offcanvas show={props.show} onHide={props.onHide}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>My Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className='d-flex flex-column'>
        {authState.id === 0 ? "You have to be logged in to see your cart." : 
          props.items.length !== 0 ?
          <ListGroup>
          {props.items.map(n => (
              <ListGroup.Item key={n.id}>
                  <h6>{n.naziv} ({n.internal}/{n.ram} GB)</h6>
                  <Button className='me-1'>Order</Button>
                  <Button onClick={() => deleteItem(n.id)} >Delete</Button>
              </ListGroup.Item>
          ))}
            </ListGroup> : <Alert variant='secondary' className='text-center mt-5'>Empty</Alert>
        }
      </Offcanvas.Body>
        <Offcanvas.Header>
          <Button onClick={props.onHide} className='w-100'>Continue shopping</Button>
        </Offcanvas.Header>

    </Offcanvas>
    )
}