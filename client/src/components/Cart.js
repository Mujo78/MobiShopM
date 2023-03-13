import { useContext } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { AuthContext } from '../helpers/AuthContext';


export default function Cart(props){

  const {authState} = useContext(AuthContext);

  

    return(
      <Offcanvas show={props.show} onHide={props.onHide}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>My Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className='d-flex flex-column'>
        {authState.id === 0 ? "You have to be logged in to see your cart." : "Place for mobile phones in cart"}
        <Button onClick={props.onHide} className='mt-auto'>Continue shopping</Button>
      </Offcanvas.Body>


    </Offcanvas>
    )
}