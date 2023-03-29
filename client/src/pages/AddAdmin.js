import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ErrorFinder from '../components/ErrorFinder';

export default function AddAdmin(){

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
            <Form onSubmit={addAdmin} className='d-flex flex-column align-items-center justify-content-center flex-wrap'>
                <Form.Group className='d-flex flex-wrap mb-3 mt-2' >
                    <div className='me-3'>
                        <Form.Label>First name</Form.Label>
                        <Form.Control 
                            type="text" 
                            autoFocus
                            onChange={handleChange}
                            name="first_name"
                            value={adminData.first_name}
                            />
                            {num > 0 && <ErrorFinder err={errorsData} fieldName="first_name"/>}
                    </div>
                    <div>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control 
                            type="text" 
                            autoFocus 
                            onChange={handleChange}
                            name="last_name"
                            value={adminData.last_name}
                            />
                       {num > 0 && <ErrorFinder err={errorsData} fieldName="last_name"/>}
                   </div>
                </Form.Group>

            <Form.Group className='d-flex flex-wrap mb-3'>
                <div className='me-3'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                        type="text" 
                        autoFocus
                        onChange={handleChange}
                        name="address"
                        value={adminData.address}
                        />
                    {num > 0 && <ErrorFinder err={errorsData} fieldName="address"/>}
                </div>
                <div>
                    <Form.Label>City</Form.Label>
                    <Form.Control 
                        type="text" 
                        autoFocus
                        onChange={handleChange}
                            name="city"
                            value={adminData.city}
                        />
                    {num > 0 && <ErrorFinder err={errorsData} fieldName="city"/>}
                </div>
            </Form.Group>

            <Form.Group className='d-flex flex-wrap mb-4'>
                <div className='me-3'>
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control 
                        type="text" 
                        autoFocus
                        onChange={handleChange}
                        name="phone_number"
                        value={adminData.phone_number}
                        />
                    {num > 0 && <ErrorFinder err={errorsData} fieldName="phone_number"/>}
                </div>
                <div>
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

                </div>
            </Form.Group>
         
            <Button variant="primary" type="submit">
                Add new Admin
            </Button>
            </Form>
            </>
  );
}