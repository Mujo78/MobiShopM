import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { BsInstagram, BsFacebook, BsTwitterX } from "react-icons/bs";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="w-100">
      <Container
        fluid
        className="d-flex flex-wrap gap-4 justify-content-md-between gap-sm-4 justify-content-center bg-light rounded-top px-3 py-3"
      >
        <div>
          <h2
            style={{
              fontFamily: "Audiowide",
              fontSize: "2rem",
              color: "#219aeb",
            }}
          >
            MShop
          </h2>
          <div className="d-flex flex-column align-items-center align-items-md-start">
            <Link to="/">Home</Link>
            <Link to="/search">Search</Link>
            <Link to="/models">Brands</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h3 style={{ fontSize: "1.3rem", color: "#219aeb" }}>Contact Us</h3>
          <span style={{ color: "#219aeb" }}>
            __________________________________
          </span>
          <p>Viber | WhatsApp: 062/432/102</p>
          <p>
            Email: <Link to="mailto:mshop@gmail.com"> mshop@gmail.com</Link>
          </p>
          <p>Address: Sarajevska 34, 72270 Travnik</p>
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
        </div>
        <div>
          <h3 style={{ fontSize: "1.3rem", color: "#219aeb" }}>
            Payment methods Us
          </h3>
          <span style={{ color: "#219aeb" }}>
            __________________________________
          </span>
          <p>When delivering/picking up the device</p>
          <p>Payment slip</p>
          <p>Payment in installments</p>
          <p>By credit card</p>
        </div>
      </Container>
      <div
        className="text-white text-center py-2 w-100"
        style={{ backgroundColor: "#219aeb" }}
      >
        Copyrights © {year.toString()} Mshop.com
      </div>
    </div>
  );
}
