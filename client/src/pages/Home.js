import Container from "react-bootstrap/esm/Container";
import CarouselSlider from "../components/Carousel";
import Footer from "../components/Footer";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Home(){
    return(
        <>
        <br/>
            <CarouselSlider />
        <br/>
        <Container style={{fontSize:"14px"}}>
            <Row className="d-flex flex-row flex-wrap justify-content-around align-items-center mb-5 mt-4">
                <Col sm={1}>
                    <img src="../images/shop.png" alt="shop" />
                    </Col>
                <Col sm={4}>
                    <p><strong>Sigurna online kupovina</strong> <br/>
                    Mogučnost pregleda uređaja</p>
                </Col>
                <Col sm={1}>
                    <img src="../images/shipping.png" alt="shop" />
                </Col>
                <Col sm={3}>
                    <p><strong>Besplatna dostava</strong> <br/>
                    Dostava za 24h</p>
                </Col>
                <Col sm={1}>
                    <img src="../images/cash.png" alt="shop" />
                </Col>
                <Col sm={2}>
                    <p><strong>Mogučnost kupovine na rate</strong> <br/>
                    Do 36 rata</p>
                </Col>
            </Row>
        </Container>
        <Container>
            
        </Container>

            <Footer />
        </>
    )
}