import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

export default function CarouselSlider() {
  return (
    <Carousel className="w-100">
      <Carousel.Item>
        <Link to="/models/2">
          <img
            className="d-block w-100"
            src="../images/Iphones.png"
            alt="Slide that displays Iphones"
          />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link to="/models/1">
          <img
            className="d-block w-100"
            src="../images/S22s.png"
            alt="Slide for Samsung smartphones"
          />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link to="/models/3">
          <img
            className="d-block w-100"
            src="../images/Xiaomis.png"
            alt="Slide for Xiaomi smartphones"
          />
        </Link>
      </Carousel.Item>
    </Carousel>
  );
}
