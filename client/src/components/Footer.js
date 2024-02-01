import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import useResponsive from "./useResponsive";
import { BsInstagram, BsFacebook, BsTwitterX } from "react-icons/bs";

export default function Footer() {
  const { isMobile, isDesktop } = useResponsive();

  const year = new Date().getFullYear();

  return (
    <Container fluid>
      <Container fluid className="d-flex px-3 py-3 flex-row flex-wrap bg-light">
        <Col sm={4} className="col">
          <Row
            style={{
              fontFamily: "Audiowide",
              fontSize: "30px",
              color: "#219aeb",
            }}
          >
            MShop
          </Row>
          <Row as={Link} to="/">
            Home
          </Row>
          <Row as={Link} to="/search">
            Search
          </Row>
          <Row as={Link} to="/models">
            Brands
          </Row>
          <Row as={Link} to="/about">
            About
          </Row>
          <Row as={Link} to="/contact">
            Contact
          </Row>
        </Col>
        <Col sm={5}>
          <Row style={{ fontSize: "19px", color: "#219aeb" }}>Contact us</Row>
          <Row style={{ color: "#219aeb" }}>
            {!isDesktop
              ? isMobile
                ? "__________________________________"
                : "__________________________________"
              : " _________________________________________________"}
          </Row>
          <Row>Viber | Whatssup: 062/432/102 - 033/111/222</Row>
          <Row>
            <Container className=" px-0 d-flex gap-2">
              <span>Email:</span>
              <Link className="" to="mailto:mshop@gmail.com">
                {" "}
                mshop@gmail.com{" "}
              </Link>
            </Container>
          </Row>
          <Row>Address: Sarajevska 34, 72270 Travnik</Row>

          <div className="d-flex gap-4 my-1">
            <Link to={"https://twitter.com/?lang=en"}>
              <BsTwitterX style={{ width: "25px", height: "25px" }} />
            </Link>
            <Link to={"https://hr-hr.facebook.com/"}>
              <BsFacebook style={{ width: "25px", height: "25px" }} />
            </Link>
            <Link to={"https://www.instagram.com/"}>
              <BsInstagram style={{ width: "25px", height: "25px" }} />
            </Link>
          </div>
        </Col>
        <Col sm={3}>
          <Row style={{ fontSize: "19px", color: "#219aeb" }}>
            Payment methods
          </Row>
          <Row style={{ color: "#219aeb" }}>
            {!isDesktop
              ? isMobile
                ? "__________________________________"
                : "__________________________"
              : " _________________________________________"}
          </Row>
          <Row>When delivering/picking up the device</Row>
          <Row>Payment slip</Row>
          <Row>Payment in installments</Row>
          <Row>By credit card</Row>
        </Col>
      </Container>
      <Row style={{ backgroundColor: "#219aeb" }} className="text-center">
        <Col xs={{ offset: 3, span: 6 }}>
          Copyrights © {year.toString()} Mshop.com
        </Col>
      </Row>
    </Container>
  );
}
