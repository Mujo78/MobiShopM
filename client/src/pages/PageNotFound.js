
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import useResponsive from "../components/useResponsive";
import styled from "styled-components";

const CustomContainer = styled(Container)
`
    .b1 {
        background-color: #ffffff;
        color: #219aeb;
        margin-right: 5px;
    }
    .b1:hover {
        background-color: #219aeb;
        color: #ffffff;
    }
    .b2 {
        background-color: #219aeb;
        color: #ffffff;
        margin-left: 5px;
    }
    .b2:hover {
        background-color: #ffffff;
        color: #219aeb;
    }
`


export default function PageNotFound() {

    const {isMobile} = useResponsive();

  const stylesBtn = {
    borderRadius: "40px",
    borderColor: "#219aeb",
    fontWeight: "bold",
    fontSize: "13px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "45px",
    width: isMobile ? "100%" : "160px",
    marginTop : isMobile ? "12px" : ""
  };

  return (
    <div className="d-flex flex-column justify-content-center w-100 align-items-center" style={{ height: "60vh" }}>
      <h1 style={{ fontSize: "225px", color: "#C0C0C0", padding: 0, margin: 0 }}>404</h1>
      <h1 style={{ fontWeight: "bold" }}>OOPS! PAGE NOT FOUND</h1>
      <p style={{ marginBottom: "30px" }}>Sorry, the page you're looking for doesn't exist. If you think something is broken, report the problem</p>
      <CustomContainer className="btnDiv align-items-center d-flex justify-content-center">
        <Button as={Link} to={"/"} className="b1" style={stylesBtn}>
          RETURN HOME
        </Button>
        <Button as={Link} to={"/contact"} className="b2" style={stylesBtn}>
          REPORT PROBLEM
        </Button>
      </CustomContainer>
    </div>
  );
}