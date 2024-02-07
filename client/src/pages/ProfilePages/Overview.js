import Container from "react-bootstrap/esm/Container";
import ListGroup from "react-bootstrap/esm/ListGroup";
import styled from "styled-components";
import useResponsive from "../../components/useResponsive";

const CustomListGroup = styled(ListGroup)`
  label {
    color: #c0c0c0;
    font-size: 12px;
  }
`;
export default function Overview() {
  const { isMobile, isDesktop } = useResponsive();
  const infoPersonState = {
    first_name: "",
    last_name: "",
    city: "",
    address: "",
  };

  return (
    <Container className={`d-flex flex-column ${!isDesktop && `p-0`}`}>
      <h3>Personal info</h3>
      <Container
        className={`w-100 mt-3 d-flex ${
          isMobile
            ? `p-0 justify-content-start flex-wrap`
            : `justify-content-around`
        }`}
      >
        <Container className={`${isMobile ? `w-100` : `w-50 me-5`}`}>
          <CustomListGroup variant="flush">
            <label>First name</label>
            <ListGroup.Item className="mb-3">
              {infoPersonState.first_name}
            </ListGroup.Item>
            {!isDesktop ? (
              <>
                <label>Last name</label>
                <ListGroup.Item className="mb-3">
                  {infoPersonState.last_name}
                </ListGroup.Item>
                <label>City</label>
                <ListGroup.Item className="mb-3">
                  {infoPersonState.city}
                </ListGroup.Item>
              </>
            ) : (
              <>
                <label>City</label>
                <ListGroup.Item className="mb-3">
                  {infoPersonState.city}
                </ListGroup.Item>
                <label>Email</label>
                <ListGroup.Item>{infoPersonState.email}</ListGroup.Item>
              </>
            )}
            <p></p>
          </CustomListGroup>
        </Container>
        <Container className={`${isMobile ? `w-100` : `w-50 me-5`}`}>
          <CustomListGroup variant="flush">
            {!isDesktop ? (
              <>
                <label>Address</label>
                <ListGroup.Item className="mb-3">
                  {infoPersonState.address}
                </ListGroup.Item>
                <label>Email</label>
                <ListGroup.Item className="mb-3">
                  {infoPersonState.email}
                </ListGroup.Item>
              </>
            ) : (
              <>
                <label>Last name</label>
                <ListGroup.Item className="mb-3">
                  {infoPersonState.last_name}
                </ListGroup.Item>
                <label>Address</label>
                <ListGroup.Item className="mb-3">
                  {infoPersonState.address}
                </ListGroup.Item>
              </>
            )}
            <label>Phone number</label>
            <ListGroup.Item>{infoPersonState.phone_number}</ListGroup.Item>
            <p></p>
          </CustomListGroup>
        </Container>
      </Container>
    </Container>
  );
}
