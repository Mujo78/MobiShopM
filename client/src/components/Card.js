import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import MobileModal from './MobileModal';
import styled from "styled-components";

const CustomCard = styled(Card)
`
  transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.06);
    }
`;


export default function Cards(props){
    const [modalShow, setModalShow] = useState(false);
    
    const handleShow = () => setModalShow(true);
    const handleClose = () =>setModalShow(false);

    return(
        <>
          <CustomCard style={{ width: '10rem'}} className="ms-4 mb-3">
            <Card.Img variant="top" src={props.mob.photo} alt="photo" style={{ height:"170px" }} />
            <Card.Body className='d-flex flex-column'>
              <Card.Title style={{fontSize:"11px"}}>{props.mob.mobile_name}</Card.Title>
              <div className='mt-auto'>
              <Card.Text className='p-0 mb-1' style={{color:"red"}}>{props.mob.price} KM</Card.Text>
              <Button variant="primary" className='w-100' onClick={handleShow}>
                See more
              </Button>
              </div>
            </Card.Body>
          </CustomCard>
          <MobileModal
            data={props.mob}
            show={modalShow}
            onHide={handleClose} 
          />
      </>
    )
}
