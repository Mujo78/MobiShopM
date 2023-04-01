import { useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import { AuthContext } from "../helpers/AuthContext";
import ListGroup from "react-bootstrap/esm/ListGroup";
import styled from "styled-components";


const CustomListGroup = styled(ListGroup)`
  label {
    color: #C0C0C0;
    font-size: 12px;
  }
`;
export default function Overview(){

    const {infoPersonState} = useContext(AuthContext);

    return (
        <Container className="d-flex flex-column">
            <h3>Personal info</h3>
            <Container className="c w-100 mt-3 d-flex justify-content-around">
                <div className="d w-50 me-5">
                    <CustomListGroup variant="flush">
                        <label>First name</label>
                        <ListGroup.Item className="mb-3">{infoPersonState.first_name}</ListGroup.Item>
                        <label>City</label>
                        <ListGroup.Item className="mb-3">{infoPersonState.city}</ListGroup.Item>
                        <label>Email</label>
                        <ListGroup.Item>{infoPersonState.email}</ListGroup.Item>
                        <p></p>
                    </CustomListGroup>
                </div>
                <div className="d w-50">
                    <CustomListGroup variant="flush">
                        <label>Last name</label>
                        <ListGroup.Item className="mb-3">{infoPersonState.last_name}</ListGroup.Item>
                        <label>City</label>
                        <ListGroup.Item className="mb-3">{infoPersonState.address}</ListGroup.Item>
                        <label>Phone number</label>
                        <ListGroup.Item>{infoPersonState.phone_number}</ListGroup.Item>
                        <p></p>
                    </CustomListGroup>
                </div>
                
            </Container>
        </Container>
    )
}