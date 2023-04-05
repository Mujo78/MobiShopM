import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ErrorFinder from '../../components/ErrorFinder';
import useResponsive from '../../components/useResponsive';
import Container from 'react-bootstrap/esm/Container';

export default function AddAdmin(){

    const {isDesktop, isMobile} = useResponsive();

    const [errorsData, setErrorsData] = useState([]);
    const [adminData, setAdminData] = useState({
        first_name: "",
        last_name: "",
        address: "",
        city: "",
        phone_number: "",
        gender: ""
    })

    function handleChange(event){
        let name = event.target.name;
        let value = event.target.value;
        setAdminData(n => ({
            ...n,
            [name]: value
         })
        )
    }   

    function addAdmin(event){
        event.preventDefault();

        axios.post("http://localhost:3001/add-admin", adminData)
        .then(() => {
            setErrorsData([]);
            setAdminData({
                first_name: "",
                last_name: "",
                address: "",
                city: "",
                phone_number: "",
                gender: ""
            })
        }).catch(error => {
            setErrorsData(error.response.data.errors);
        })
    }

    let num = errorsData.length;

    return(
        <>
            <h1>Add new Admin</h1>
            <Form onSubmit={addAdmin} className={`d-flex flex-column  align-items-center flex-wrap justify-content-around w-75`}>
                <Form.Group className={`d-flex ${isDesktop ? `w-50` : `w-100`} justify-content-around flex-wrap mb-3 mt-2`} >
                    <Container  className={isMobile ? 'w-100 p-0 mb-3' : 'w-50'}>
                        <Form.Label>First name</Form.Label>
                        <Form.Control 
                            type="text" 
                            autoFocus
                            onChange={handleChange}
                            name="first_name"
                            value={adminData.first_name}
                            />
                            {num > 0 && <ErrorFinder err={errorsData} fieldName="first_name"/>}
                    </Container>
                    <Container className={isMobile ? 'w-100 p-0' : 'w-50'}>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control 
                            type="text" 
                            autoFocus 
                            onChange={handleChange}
                            name="last_name"
                            value={adminData.last_name}
                            />
                       {num > 0 && <ErrorFinder err={errorsData} fieldName="last_name"/>}
                   </Container>
                </Form.Group>

            <Form.Group className={`d-flex ${isDesktop ? `w-50` : `w-100`} justify-content-around flex-wrap mb-3`}>
                <Container className={isMobile ? 'w-100 p-0' : 'w-50'}>
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                        type="text" 
                        autoFocus
                        onChange={handleChange}
                        name="address"
                        value={adminData.address}
                        />
                    {num > 0 && <ErrorFinder err={errorsData} fieldName="address"/>}
                </Container>
                <Container className={isMobile ? 'w-100 p-0' : 'w-50'}>
                    <Form.Label>City</Form.Label>
                    <Form.Control 
                        type="text" 
                        autoFocus
                        onChange={handleChange}
                            name="city"
                            value={adminData.city}
                        />
                    {num > 0 && <ErrorFinder err={errorsData} fieldName="city"/>}
                </Container>
            </Form.Group>

            <Form.Group className={`d-flex ${isDesktop ? `w-50` : `w-100`} justify-content-around flex-wrap mb-4`}>
                <Container className={isMobile ? 'w-100 p-0' : 'w-75'}>
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control 
                        type="text" 
                        autoFocus
                        onChange={handleChange}
                        name="phone_number"
                        value={adminData.phone_number}
                        />
                    {num > 0 && <ErrorFinder err={errorsData} fieldName="phone_number"/>}
                </Container>
                <Container className={isMobile ? 'w-100 p-0' : 'w-25'}>
                    <Form.Label>Gender</Form.Label>
                    <Form.Select 
                        aria-label="Default select example" 
                        value={adminData.gender}
                        onChange={handleChange}
                        name="gender">
                            <option>- Choose one option -</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Form.Select>
                    {num  > 0 && <ErrorFinder err={errorsData} fieldName="gender"/>}

                </Container>
            </Form.Group>
         
            <Button variant="primary" type="submit" style={{backgroundColor: "#219aeb", border: "none"}}>
                Add new Admin
            </Button>
            </Form>
            </>
  );
}