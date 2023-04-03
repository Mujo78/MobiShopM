import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import MobileModal from './MobileModal';
import styled from "styled-components";
import { Image } from './Nav';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

const CustomCard = styled(Card)
`
  transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.06);
    }

    .card {
      --bs-card-spacer-y: 0;
    }
`;


export default function Cards(props){
    const [modalShow, setModalShow] = useState(false);
    const [heartState, setheartState] = useState(false);

    const handleHeartFillTrue = () => {
      setheartState(true);
    };
    const handleHeartEmptyFalse = () => {
      setheartState(false)
    };

    const handleShow = () => setModalShow(true);
    const handleClose = () =>setModalShow(false);

    return(
        <>
          <CustomCard style={{ width: '8rem', borderRadius: 0}} className="ms-4 mb-3">
            <Card.Img variant="top" src={props.mob.photo} alt="photo" style={{ height:"150px", borderBottom: "1px solid #C0C0C0" }} />
            <Card.Title style={{fontSize:"11px"}} className='ms-2 me-2 mt-3 mb-0'>{props.mob.mobile_name}</Card.Title>
            <Card.Body className='d-flex flex-column pb-0 pt-1'>
              <>
                <Row className='d-flex align-items-center pb-1'>
                <Col>
                  <Card.Text className='p-0' style={{color:"red", fontSize: "14px"}}>{props.mob.price} KM</Card.Text>                
                </Col>
                <Col sm={4}>
                  {
                    !heartState ?
                      <Button onClick={handleHeartFillTrue} style={{backgroundColor: "transparent", border: "none", width: "fit-content"}} className='p-0 mb-1'>
                      <Image src="/images/empty.png" style={{height: "20px"}} />
                    </Button> :
                    <Button onClick={handleHeartEmptyFalse} style={{backgroundColor: "transparent", border: "none", width: "fit-content"}} className='p-0 mb-1'>
                    <Image src="/images/filled.png" style={{height: "20px"}} />
                  </Button>

                  }
                </Col>
                </Row>
              </>
            </Card.Body>
            <Card.Footer style={{padding: 0, border: "none"}}>
              <Button style={{backgroundColor: "#219aeb", border: "none", borderRadius: 0, fontSize: "10px"}} className='w-100' onClick={handleShow}>
                See more
              </Button>
            </Card.Footer>
          </CustomCard>
          <MobileModal
            data={props.mob}
            show={modalShow}
            onHide={handleClose} 
          />
      </>
    )
}
