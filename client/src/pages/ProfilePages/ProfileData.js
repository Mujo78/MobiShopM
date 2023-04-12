import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled from "styled-components";
import { useContext, useState } from "react";
import { AuthContext } from "../../helpers/AuthContext";
import ErrorFinder from "../../components/ErrorFinder";
import axios from "axios";
import { toast } from "react-toastify";
import useResponsive from "../../components/useResponsive";

const CustomDiv = styled(Container)`
  label {
    color: #C0C0C0;
    font-size: 12px;
  }
`;

export default function ProfileData(){

    const {authState, setAuthState} = useContext(AuthContext);
    const [errorState, setErrorState] = useState([]);
    const {isMobile} = useResponsive();

    const handleChange = (event) =>{
        const {name, value} = event.target;

        setAuthState(n => ({
            ...n,
            [name]:value
        }))
    }

    const handleSubmit = (event) =>{
        event.preventDefault();

        axios.put(`http://localhost:3001/edit-username/${authState.id}`, authState, {
            headers:{
                'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(() => {
            toast.success("Username successfully changed!");
            setErrorState([]);
        })
        .catch(error => setErrorState(error.response.data.errors));
    }

    let num = errorState.length;

    return(
        <Container  className="mt-4">
            <h3>Edit profile</h3>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <CustomDiv className="mb-3 p-0">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="text"
                            name="username"
                            onChange={handleChange}
                            value={authState.username || ''}
                        />
                        {num > 0 && <ErrorFinder err={errorState} fieldName="username" />}
                    </CustomDiv>
                    <Button style={{backgroundColor:"#219aeb", borderRadius: 0, border:"none"}} type="submit" className={isMobile ? "w-100" : "w-25"}>
                        Save changes
                    </Button>
                </Form>
            </Container>
        </Container>
    )
}