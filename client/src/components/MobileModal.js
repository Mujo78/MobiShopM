import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from "react-bootstrap/Image";
import ListGroup from 'react-bootstrap/ListGroup';

export default function MobileModal(props){

    function addToCart(){
        console.log("Added!")
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
        <ListGroup.Item>Display: {props.data.velicinaEkrana}</ListGroup.Item>
        <ListGroup.Item>{props.data.internal}GB {props.data.ram}GB RAM</ListGroup.Item>
        <ListGroup.Item>Processor: {props.data.procesor}</ListGroup.Item>
        <ListGroup.Item>Baterry: {props.data.baterija}</ListGroup.Item>
        <ListGroup.Item>OS: {props.data.os}</ListGroup.Item>
        <ListGroup.Item>Camera: {props.data.kamera}</ListGroup.Item>
        <ListGroup.Item>Price: {props.data.cijena} KM</ListGroup.Item>
      </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={addToCart}>Add to cart</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
