import Container from "react-bootstrap/esm/Container";
import CarouselSlider from "../components/Carousel";
import Footer from "../components/Footer";
import { useState } from "react";
import Cards from "../components/Card";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from "styled-components";
import Spinner from "react-bootstrap/Spinner";
import { BsShop, BsTruck, BsCashStack } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { fetchTopPrice } from "../api";

const CustomCarousel = styled(Carousel)`
  .carousel .control-dots .dot {
    background-color: #219aeb;
  }
  .carousel .control-dots {
    margin: -4px 0;
  }
`;

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const {
    data: topPricesState,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["topPrices"], queryFn: fetchTopPrice });

  const activeStyles = {
    transform: "scale(0.9)",
    transition: "all 0.3s ease-in-out",
    display: "flex",
    justifyContent: "center",
  };

  const styles = {
    transform: "scale(0.8)",
    transition: "all 0.3s ease-in-out",
    filter:
      "brightness(0.6) contrast(0.8) saturate(0.1) sepia(0.1) hue-rotate(65deg)",
    opacity: "0.5",
  };

  const iconStyles = {
    width: "4em",
    height: "4em",
    color: "#219aeb",
  };

  return (
    <main className="d-flex flex-column gap-5">
      <CarouselSlider />
      <Container
        fluid
        className="d-sm-flex justify-content-around gap-4 flex-wrap align-items-center"
      >
        <div className="d-sm-flex gap-3 flex-md-row flex-sm-column align-items-center">
          <span className="d-flex align-items-center justify-content-center">
            <BsShop style={iconStyles} />
          </span>

          <p className="text-center">
            <strong>Safe online shopping</strong>
            <br />
            Device review before purchase
          </p>
        </div>
        <div className="d-sm-flex gap-3 flex-md-row flex-sm-column align-items-center">
          <span className="d-flex align-items-center justify-content-center">
            <BsTruck style={iconStyles} />
          </span>

          <p className="text-center">
            <strong>Free delivery</strong>
            <br />
            Delivery in 24/48h
          </p>
        </div>

        <div className="d-sm-flex gap-3 flex-md-row flex-sm-column align-items-center">
          <span className="d-flex align-items-center justify-content-center">
            <BsCashStack style={iconStyles} />
          </span>
          <p className="text-center">
            <strong>Possibility of purchase in installments</strong>
            <br />
            Up to 36 installments
          </p>
        </div>
      </Container>
      <br />
      <Container fluid className="mb-5">
        <h3 className="mt-5 text-decoration-underline">Top prices</h3>
        {isLoading ? (
          <div className="w-100 mt-5 d-flex justify-content-center align-items-center">
            <Spinner />
          </div>
        ) : topPricesState.length > 0 ? (
          <CustomCarousel
            showArrows={true}
            showStatus={false}
            showThumbs={false}
            emulateTouch={true}
            autoPlay={true}
            interval={3000}
            stopOnHover={true}
            infiniteLoop={true}
            centerMode={true}
            centerSlidePercentage={120}
            swipeable={true}
            transitionTime={3000}
            showIndicators={true}
            onChange={(i) =>
              i === topPricesState.length
                ? setActiveIndex(
                    topPricesState.length - 1 - (i % topPricesState.length)
                  )
                : setActiveIndex(i)
            }
            selectedItem={activeIndex}
          >
            {topPricesState.length &&
              topPricesState.map((n, index) => (
                <Container
                  key={n.id}
                  style={activeIndex === index ? activeStyles : styles}
                >
                  <Cards mob={n} />
                </Container>
              ))}
          </CustomCarousel>
        ) : (
          isError && <p>Something went wrong, we will fix it soon.</p>
        )}
      </Container>

      <Footer />
    </main>
  );
}
