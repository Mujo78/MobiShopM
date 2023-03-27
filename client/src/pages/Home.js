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
import useResponsive from "../components/useResponsive";


const CustomCarousel = styled(Carousel)`
.carousel .control-dots .dot{
    background-color: #219aeb;
}
.carousel .control-dots{
    margin: -4px 0;
}
`;


export default function Home(){

    const {isMobile, isTablet} = useResponsive();
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
        transition: 'all 0.3s ease-in-out',
        display:"flex",
        justifyContent :"center"
    };
    const styles = {
        transform: 'scale(0.8)',
        transition: 'all 0.3s ease-in-out',
        filter: 'brightness(0.6) contrast(0.8) saturate(0.1) sepia(0.1) hue-rotate(65deg)',
        opacity: '0.5'
    };
    let number;
    if(isMobile){
        number = 120;
    }else if(isTablet){
        number = 40
    }else{
        number = 20;
    }

    return(
        <>
        <br/>
            <CarouselSlider />
        <br/>
        <Container fluid>
            <Row className="d-flex flex-row flex-wrap justify-content-center align-items-center my-4">
                <Col sm={isTablet ? 0: 1} className="d-flex justify-content-center  me-1">
                <img src="../images/shop.png" alt="shop" />
                </Col>
                <Col sm={isTablet ? 0:2} className="d-flex justify-content-center mt-3 mt-sm-0">
                <p className="text-center text-sm-start"><strong>Safe online shopping</strong><br />Device review before purchase</p>
                </Col>
                <Col sm={isTablet ? 0:1} className="d-flex justify-content-center mt-3 me-1 mt-sm-0">
                <img src="../images/shipping.png" alt="shipping" />
                </Col>
                <Col sm={isTablet ? 0:2} className="d-flex justify-content-center mt-3 mt-sm-0">
                <p className="text-center text-sm-start"><strong>Free delivery</strong><br />Delivery in 24/48h</p>
                </Col>
                <Col sm={isTablet ? 0:1} className="d-flex justify-content-center mt-3 me-1 mt-sm-0">
                <img src="../images/cash.png" alt="cash" />
                </Col>
                <Col sm={isTablet ? 0:3} className="d-flex justify-content-center mt-3 mt-sm-2">
                <p className="text-center text-sm-start"><strong>Possibility of purchase in installments</strong><br />Up to 36 installments</p>
                </Col>
            </Row>
        </Container>
        <Container fluid className="mb-5">

            <h3 style={{textDecoration:"underline"}} className="mt-1">Top prices</h3>
            <CustomCarousel showArrows={true}
                    showStatus={false}
                    showThumbs={false}
                    emulateTouch={true}
                    autoPlay={true}
                    interval={3000}
                    stopOnHover={true}
                    infiniteLoop={true}
                    centerMode={true}
                    centerSlidePercentage={number}
                    swipeable={true}
                    transitionTime={3000}
                    showIndicators={true}
                    onChange={i => i===topPricesState.length ?  setActiveIndex(topPricesState.length - 1 - (i % topPricesState.length)) : setActiveIndex(i)}
                    selectedItem={activeIndex}
                    >
                        {topPricesState.length && topPricesState.map((n, index) => (
                            <div key={n.id} style={activeIndex === index ? activeStyles : styles}>
                                <Cards mob={n} />
                            </div>))
                        }
        
      </CustomCarousel>
        </Container>

            <Footer />
        </>
    )
}