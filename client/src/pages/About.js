import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import styled, {keyframes} from "styled-components";
import Footer from "../components/Footer";
import useResponsive from "../components/useResponsive";



const slideInAnimation = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const slideInAnimationForSpecificOne = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const Cols = styled(Col)
`
    border: 2px #219aeb solid;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #219aeb;
    font-weight: bold;
    &.c1{
        animation: ${slideInAnimation} 4.5s forwards;
    }
    &.c2{
        animation: ${slideInAnimationForSpecificOne} 4.5s forwards;
    }
`


export default function About(){
    
    const {isMobile} = useResponsive();
    const cl = {
        id: 1
    }

    return(
        <>
            <Container style={{overflow: "hidden", textAlign: "justify"}} className="mb-5 mt-5">
                <Row className={`mb-5 mt-5 d-flex flex-wrap ${isMobile ? `flex-column` : `flex-row`}`} >
                    <Col>
                         <h2 className="text-center">About Us</h2>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Col>
                    <Cols className="c1">
                        <p>P1</p>
                    </Cols>
                </Row>
                <Row className={`mb-5 mt-5 d-flex flex-wrap ${isMobile ? `flex-column` : `flex-row`}`}>
                    <Cols className="c2">
                        <p>P2</p>
                    </Cols>
                    <Col>
                    <h2 className="text-center" >How to find us</h2>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Col>
                </Row>
                <Row className={`mb-5 mt-5 d-flex flex-wrap ${isMobile ? `flex-column` : `flex-row`}`}>
                    <Col>
                    <h2 className="text-center">More interesting things</h2>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Col>
                    <Cols className="c1">
                        <p>P3</p>
                    </Cols>
                </Row>
            </Container>
            <Footer />
        </>
    )
}