import Carousel from 'react-bootstrap/Carousel';

export default function CarouselSlider() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="../images/Iphones.png"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="../images/S22s.png"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="../images/Xiaomis.png"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

