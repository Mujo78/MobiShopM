import Container from "react-bootstrap/esm/Container";
import CarouselSlider from "../components/Carousel";
import Footer from "../components/Footer";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../components/Card";
import {Carousel} from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styled from 'styled-components';


const CustomCarousel = styled(Carousel)`
.carousel .control-dots .dot{
    background-color: #219aeb;
}
.carousel .control-dots{
    margin: -4px 0;
}
`;


export default function Home(){

    const [topPricesState, setTopPricesState] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() =>{
        getTopPrices();
    }, [])

    const getTopPrices = ()=>{
        axios.get("http://localhost:3001/mobiteli-top-prices")
        .then(response => setTopPricesState(response.data))
        .catch(error => console.log(error))
    }

  const activeStyles = {
    transform: 'scale(1.0)',
    transition: 'all 0.3s ease-in-out'
};
  const styles = {
    transform: 'scale(0.8)',
    transition: 'all 0.3s ease-in-out'
  };

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
                    <p><strong>Safe online shopping</strong> <br/>
                    Device review before purchase</p>
                </Col>
                <Col sm={1}>
                    <img src="../images/shipping.png" alt="shop" />
                </Col>
                <Col sm={3}>
                    <p><strong>Free delivery</strong> <br/>
                    Delivery in 24/48h</p>
                </Col>
                <Col sm={1}>
                    <img src="../images/cash.png" alt="shop" />
                </Col>
                <Col sm={2}>
                    <p><strong>Possibility of purchase in installments</strong> <br/>
                    Up to 36 installments</p>
                </Col>
            </Row>
        </Container>
        <Container className="mb-5">

            <h3 style={{textDecoration:"underline"}}>Top prices</h3>
            <CustomCarousel showArrows={true}
                    showStatus={false}
                    showThumbs={false}
                    emulateTouch={true}
                    autoPlay={true}
                    interval={3000}
                    stopOnHover={true}
                    infiniteLoop={true}
                    centerMode={true}
                    centerSlidePercentage={20}
                    swipeable={true}
                    transitionTime={3000}
                    showIndicators={true}
                    onChange={i => i===topPricesState.length ?  setActiveIndex(topPricesState.length - 1 - (i % topPricesState.length)) : setActiveIndex(i)}
                    selectedItem={activeIndex}>
        {topPricesState.length && topPricesState.map((n, index) => (
            <div key={n.id} style={activeIndex === index ? activeStyles : styles}>
                <Cards mob={n} />
                </div>
                ))}
        
      </CustomCarousel>
        </Container>

            <Footer />
        </>
    )
}