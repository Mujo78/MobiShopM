import Container from "react-bootstrap/esm/Container";
import CarouselSlider from "../components/UI/Carousel";
import Footer from "../components/UI/Footer";
import { useState } from "react";
import Cards from "../components/Mobile/Card";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BsShop, BsTruck, BsCashStack } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { fetchTopPrice } from "../api";
import CustomSpinner from "../components/UI/CustomSpinner";
import CustomAlert from "../components/UI/Alert";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const {
    data: topPrices,
    isFetching,
    isError,
  } = useQuery({ queryKey: ["topPrices"], queryFn: fetchTopPrice, retry: 1 });

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
    cursor: "pointer",
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
        {isFetching ? (
          <CustomSpinner />
        ) : topPrices?.length > 0 ? (
          <Carousel
            centerMode
            stopOnHover
            showIndicators={false}
            showStatus={false}
            autoPlay
            showThumbs={false}
            centerSlidePercentage={10}
            showArrows
            onChange={(i) =>
              i === topPrices.length
                ? setActiveIndex(topPrices.length - 1 - (i % topPrices.length))
                : setActiveIndex(i)
            }
            infiniteLoop
            interval={4000}
            selectedItem={activeIndex}
            swipeScrollTolerance={50}
            swipeable
            onClickItem={(item) => {
              setActiveIndex(item);
            }}
            transitionTime={3000}
          >
            {topPrices?.map((n, index) => (
              <Container
                className="p-0"
                fluid
                key={n.id}
                style={activeIndex === index ? activeStyles : styles}
              >
                <Cards mob={n} disabled={!(activeIndex === index)} />
              </Container>
            ))}
          </Carousel>
        ) : (
          isError && (
            <CustomAlert variant="danger">
              Something went wrong, we will fix it soon.
            </CustomAlert>
          )
        )}
      </Container>

      <Footer />
    </main>
  );
}
