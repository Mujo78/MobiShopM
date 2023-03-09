import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import MobileModal from './MobileModal';



export default function Cards(props){

    const [modalShow, setModalShow] = useState(false);
    const handleShow = () => setModalShow(true);
    const handleClose = () =>setModalShow(false);

    return(
        <>
        <Card style={{ width: '12rem'}} className="ms-4 mb-3">
        <Card.Img variant="top" src={props.mob.photo} alt="photo" style={{ height:"220px" }} />
        <Card.Body>
          <Card.Title style={{fontSize:"11px"}}>{props.mob.naziv}</Card.Title>
            <Button variant="primary" onClick={handleShow}>
            See more
            </Button>
        </Card.Body>
      </Card>
      <MobileModal
      data={props.mob}
      show={modalShow}
      onHide={handleClose} />
      </>
    )
}
