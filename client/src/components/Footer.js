import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import useResponsive from './useResponsive';

const Image = styled.img`
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.2);
    }
`;


export default function Footer(){

    const {isMobile, isDesktop} = useResponsive();
    const location = useLocation()

    console.log(location)
    return (
        <Container fluid style={{backgroundColor:"whitesmoke"}}>
           <Container fluid className='d-flex  flex-row flex-wrap'>
                <Col sm={4} className="col">
                        <Row style={{fontFamily:"Audiowide", fontSize:"30px", color:"#219aeb"}}>MShop</Row>
                        <Row as={Link} to="/">Home</Row>
                        <Row as={Link} to="/search">Search</Row>
                        <Row as={Link} to="/models">Brands</Row>
                        <Row as={Link} to="/about">About</Row>
                        <Row as={Link} to="/contact">Contact</Row>
                        
                </Col>
                <Col  sm={5}>
                        <Row style={{fontSize:"19px" ,color:"#219aeb"}}>Contact us</Row>
                        <Row style={{color:"#219aeb"}}>{!isDesktop ? isMobile ? "__________________________________" : "__________________________________" : " _________________________________________________"}</Row>
                        <Row>Viber | Whatssup : 062/432/102 - 033/111/222</Row>
                        <Row>Email: mshop@gmail.com</Row>
                        <Row>Address: Sarajevska 34, 72270 Travnik</Row>
                        
                        <Link to={"https://twitter.com/?lang=en"}><Image src='../images/twitter.svg' alt='fb' style={{height: "50px"}} /></Link>
                        <Link to={"https://hr-hr.facebook.com/"}><Image src='../images/facebook.svg' alt='fb' style={{height: "50px"}}/></Link>
                        <Link to={"https://www.instagram.com/"}><Image src='../images/instagram.svg' alt='fb' style={{height: "50px"}}/></Link>
                        
                        
                </Col>
                <Col sm={3}>
                        <Row style={{fontSize:"19px" ,color:"#219aeb"}}>Payment methods</Row>
                        <Row style={{color:"#219aeb"}}>{!isDesktop ? isMobile ? "__________________________________" : "__________________________" : " _________________________________________"}</Row>
                        <Row>When delivering/picking up the device</Row>
                        <Row>Payment slip</Row>
                        <Row>Payment in installments</Row>
                        <Row>By credit card</Row>
                </Col>
            </Container>
            <Row style={{backgroundColor:"#219aeb"}} className="text-center">
                <Col xs={{ offset: 3, span: 6 }}>Copyrights © 2023 Mshop.com</Col>
            </Row>
        </Container>
    );
}