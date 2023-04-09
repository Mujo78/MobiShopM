import {useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import MobileModal from './MobileModal';
import styled from "styled-components";
import { Image } from './Nav';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import axios from 'axios';
import { toast } from 'react-toastify';
import useResponsive from './useResponsive';
import { AuthContext } from '../helpers/AuthContext';

const CustomCard = styled(Card)
`
  transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.06);
    }
`;


export default function Cards({mob : {photo, mobile_name, price, id}, mob}){
    const [modalShow, setModalShow] = useState(false);
    const [heartState, setheartState] = useState(false);
    const [wishListState, setWishListState] = useState([]);
    const {authState} = useContext(AuthContext);
    const {isMobile} = useResponsive();

    const handleHeartFillTrue = (id) => {
      console.log(id);

      axios.post(`http://localhost:3001/add-to-wishlist/${id}`, {}, {
        headers:{
          'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
      .then(() =>{
        setheartState(true);
        getWishItems();
        toast.success("Successfully added to wishlist!")
      })
      .catch(error => toast.error(error))
      
    };
    const handleHeartEmptyFalse = (id) => {

      axios.delete(`http://localhost:3001/delete-wishitem/${id}`, {
        headers:{
          'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
      .then(() =>{
        getWishItems();
        setheartState(false)
        toast.info("Item removed from wishlist!")
      })
      .catch(error => toast.error(error))
    };

    useEffect(() =>{
        getWishItems()
    }, [])

    const getWishItems = () => {
      if(authState.id !== 0 && authState.RoleId === 2){
        axios.get(`http://localhost:3001/wish-items`, {
            headers:{
              'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
            }
          })
          .then((response) => setWishListState(response.data))
          .catch(error => toast.error(error))
      }
    }

    const handleShow = () => setModalShow(true);
    const handleClose = () =>setModalShow(false);

    const styles = {
      backgroundColor: "transparent",
      border: "none", 
      width: "fit-content"
    }

    return(
        <>
          <CustomCard style={{ width: '8rem', borderRadius: 0}} className="ms-4 mb-3">
            <Card.Img variant="top" src={photo} alt="photo" style={{ height:"150px", borderBottom: "1px solid #C0C0C0" }} />
            <Card.Title style={{fontSize:"11px"}} className='ms-2 me-2 mt-3 mb-0'>{mobile_name}</Card.Title>
            <Card.Body className='d-flex flex-column pb-0 pt-1'>
              <>
                <Row className='d-flex align-items-center pb-1'>
                <Col className={isMobile && 'w-50'}>
                  <Card.Text className='p-0' style={{color:"red", fontSize: "12px"}}>{price} KM</Card.Text>                
                </Col>
                {authState.RoleId === 2 && 
                  <Col sm={4} className={isMobile && 'w-25 me-3'}>
                      { wishListState.some(n => n.MobileId === id) ?
                        <Button onClick={() => handleHeartEmptyFalse(id)} style={styles} className='p-0 mb-1'>
                          <Image src="/images/filled.png" style={{height: "20px"}} />
                        </Button> :
                        <Button onClick={() => handleHeartFillTrue(id)} style={styles} className='p-0 mb-1'>
                          <Image src="/images/empty.png" style={{height: "20px"}} />
                        </Button>
                      }
                  </Col>
                }
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
            data={mob}
            show={modalShow}
            onHide={handleClose} 
          />
      </>
    )
}
