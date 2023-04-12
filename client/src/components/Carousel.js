import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

export default function CarouselSlider() {
  return (
    <Carousel>
      <Carousel.Item>
        <Link to={`/models?brand_id=2`}>
        <img
          className="d-block w-100"
          src="../images/Iphones.png"
          alt="First slide"
        />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
      <Link to={`/models?brand_id=1`}>
        <img
          className="d-block w-100"
          src="../images/S22s.png"
          alt="Second slide"
        />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
      <Link to={`/models?brand_id=3`}>
        <img
          className="d-block w-100"
          src="../images/Xiaomis.png"
          alt="Third slide"
        />
        </Link>
      </Carousel.Item>
    </Carousel>
  );
}

