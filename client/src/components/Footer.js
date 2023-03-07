import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

export default function Footer(){
    return (
        <Container style={{backgroundColor:"whitesmoke"}}>
           <Container className='d-flex  flex-row flex-wrap'>
                <Col sm={4}>
                        <Row style={{fontFamily:"Audiowide", fontSize:"30px", color:"#219aeb"}}>MShop</Row>
                        <Row as={Link} to="/">Home</Row>
                        <Row as={Link} to="/search">Search</Row>
                        <Row as={Link} to="/models">Models</Row>
                        <Row as={Link} to="/about">About</Row>
                        <Row as={Link} to="/contact">Contact</Row>
                        
                </Col>
                <Col  sm={5}>
                        <Row style={{fontSize:"19px" ,color:"#219aeb"}}>Contact us</Row>
                        <Row style={{color:"#219aeb"}}>_________________________________________________</Row>
                        <Row>Viber | Whatssup : 062/432/102 - 033/111/222</Row>
                        <Row>Email: mshop@gmail.com</Row>
                        <Row>Adresa: Sarajevska 34, 72270 Travnik</Row>
                        
                        <Link to={"https://twitter.com/?lang=en"}><img src='../images/twitter.svg' alt='fb' /></Link>
                        <Link to={"https://hr-hr.facebook.com/"}><img src='../images/facebook.svg' alt='fb' /></Link>
                        <Link to={"https://www.instagram.com/"}><img src='../images/instagram.svg' alt='fb' /></Link>
                        
                        
                </Col>
                <Col sm={3}>
                        <Row style={{fontSize:"19px" ,color:"#219aeb"}}>Payment methods</Row>
                        <Row style={{color:"#219aeb"}}>_________________________________________</Row>
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