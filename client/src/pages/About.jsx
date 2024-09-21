import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Footer from "../components/UI/Footer";

export default function About() {
  return (
    <>
      <Container className="my-5 overflow-hidden text-center">
        <Row className="my-5 d-flex flex-column flex-wrap flex-md-row">
          <Col>
            <h2 className="text-center">About Us</h2>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Col>
          <Col className="Cols c1">
            <p>P1</p>
          </Col>
        </Row>
        <Row className="my-5 d-flex flex-column flex-wrap flex-md-row">
          <Col className="Cols c2">
            <p>P2</p>
          </Col>
          <Col>
            <h2 className="text-center">How to find us</h2>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Col>
        </Row>
        <Row className="my-5 d-flex flex-column flex-wrap flex-md-row">
          <Col>
            <h2 className="text-center">More interesting things</h2>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Col>
          <Col className="Cols c1">
            <p>P3</p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
