import { useContext, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { AuthContext } from "../../helpers/AuthContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ErrorFinder from "../../components/ErrorFinder";
import axios from "axios";
import styled from "styled-components";
import FormGroup from "react-bootstrap/esm/FormGroup";
import useResponsive from "../../components/useResponsive";

const CustomDiv = styled(Container)`
  label {
    color: #C0C0C0;
    font-size: 12px;
  }

  padding: 0;
`;

export default function Info(){

    const {infoPersonState, setInfoPersonState} = useContext(AuthContext);
    const [errorState, setErrorState] = useState([]);
    const {isMobile, isDesktop} = useResponsive();

    const handleChange = (event) =>{
        const {name, value} = event.target;

        setInfoPersonState(n => ({
            ...n,
            [name]:value
        }))
    }

    const handleSubmit = (event) =>{
        event.preventDefault();

        axios.put(`http://localhost:3001/edit-profile/${infoPersonState.id}`, infoPersonState, {
            headers:{
                'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(response =>{
            setInfoPersonState(response.data);
            setErrorState([]);
        })
        .catch(error => setErrorState(error.response.data.errors))
    }

    let num = errorState.length;

    return(
        <Container className="mt-4">
            <h3>Edit personal info</h3>
            <Container>
            <Form className="mb-5" onSubmit={handleSubmit}>
                <FormGroup className={`mb-3 d-flex ${isMobile &&`flex-wrap`} justify-content-around w-100`}>
                    <CustomDiv className={isMobile ? "w-100" : "w-50"}>
                        <Form.Label>First name</Form.Label>
                        <Form.Control 
                            type="text"
                            name="first_name"
                            value={infoPersonState.first_name || ''}
                            onChange={handleChange}
                        />
                        {num > 0 && <ErrorFinder err={errorState} fieldName="first_name" />}

                    </CustomDiv>
                    <CustomDiv className={isMobile ? "w-100" : "w-50 ms-2"}>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control 
                            type="text"
                            name="last_name"
                            value={infoPersonState.last_name || ''}
                            onChange={handleChange} 
                        />
                        {num > 0 && <ErrorFinder err={errorState} fieldName="last_name" />}
                    </CustomDiv>
                </FormGroup>
                <Form.Group className={`mb-3 d-flex ${isMobile &&`flex-wrap`} justify-content-around w-100`}>
                    <CustomDiv className={isMobile ? "me-0" : "me-2"}>
                        <Form.Label>City</Form.Label>
                        <Form.Control 
                            type="text"
                            name="city"
                            value={infoPersonState.city || ''}
                            onChange={handleChange}
                        />
                       {num > 0 && <ErrorFinder err={errorState} fieldName="city" />}
                    </CustomDiv>
                    <CustomDiv className={isMobile ? "me-0" : "me-2"}>
                        <Form.Label>Address</Form.Label>
                        <Form.Control 
                            type="text"
                            name="address"
                            value={infoPersonState.address || ''}
                            onChange={handleChange}  
                        />
                        {num > 0 && <ErrorFinder err={errorState} fieldName="address" />}
                    </CustomDiv>
                    <CustomDiv>
                        <Form.Label>Gender</Form.Label>
                        <Form.Select 
                            name="gender"
                            value={infoPersonState.gender}
                            onChange={handleChange}
                        >
                            <option>- Choose one option -</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Form.Select>
                        {num > 0 && <ErrorFinder err={errorState} fieldName="gender" />}
                    </CustomDiv>
                </Form.Group>
                <Form.Group className={`mb-3 d-flex ${isMobile &&`flex-wrap`} justify-content-around w-100`}>
                    <CustomDiv className={isMobile ? "w-100" : "w-50 me-2"}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email"
                            name="email"
                            value={infoPersonState.email || ''}
                            onChange={handleChange}
                        />
                        {num > 0 && <ErrorFinder err={errorState} fieldName="email" />}
                    </CustomDiv>
                    <CustomDiv className={isMobile ? "w-100 mb-2" : "w-50 mb-2"}>
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="phone_number"
                            value={infoPersonState.phone_number || ''}
                            onChange={handleChange}  
                            />
                            {num > 0 && <ErrorFinder err={errorState} fieldName="phone_number" />}
                    </CustomDiv>
                </Form.Group>


                <Button type="submit" style={{backgroundColor:"#219aeb",border:"none", borderRadius: 0}} className={isDesktop ? "w-25": "w-100"}>
                    Save changes
                </Button>
            </Form>
            </Container>
        </Container>
    )
}