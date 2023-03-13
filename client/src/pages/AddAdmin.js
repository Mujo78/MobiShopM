import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ErrorFinder from '../components/ErrorFinder';

export default function AddAdmin(){

    const [errorsData, setErrorsData] = useState([]);
    const [adminData, setAdminData] = useState({
        ime: "",
        prezime: "",
        adresa: "",
        grad: "",
        broj_telefona: "",
        spol: ""
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
                ime:"",
                prezime:"",
                adresa:"",
                grad:"",
                broj_telefona:"",
                spol:""
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
                <Form.Group className='d-flex flex-wrap' >
                    <div className='me-3'>
                        <Form.Label>Ime</Form.Label>
                        <Form.Control 
                            type="text" 
                            autoFocus
                            onChange={handleChange}
                            name="ime"
                            value={adminData.ime}
                            />
                            {num > 0 && <ErrorFinder err={errorsData} fieldName="ime"/>}
                    </div>
                    <div>
                        <Form.Label>Prezime</Form.Label>
                        <Form.Control 
                            type="text" 
                            autoFocus 
                            onChange={handleChange}
                            name="prezime"
                            value={adminData.prezime}
                            />
                       {num > 0 && <ErrorFinder err={errorsData} fieldName="prezime"/>}
                   </div>
                </Form.Group>

            <Form.Group className='d-flex flex-wrap'>
                <div className='me-3'>
                    <Form.Label>Adresa</Form.Label>
                    <Form.Control 
                        type="text" 
                        autoFocus
                        onChange={handleChange}
                        name="adresa"
                        value={adminData.adresa}
                        />
                    {num > 0 && <ErrorFinder err={errorsData} fieldName="adresa"/>}
                </div>
                <div>
                    <Form.Label>Grad</Form.Label>
                    <Form.Control 
                        type="text" 
                        autoFocus
                        onChange={handleChange}
                            name="grad"
                            value={adminData.grad}
                        />
                    {num > 0 && <ErrorFinder err={errorsData} fieldName="grad"/>}
                </div>
            </Form.Group>

            <Form.Group className='d-flex flex-wrap mb-4'>
                <div className='me-3'>
                    <Form.Label>Broj telefona</Form.Label>
                    <Form.Control 
                        type="text" 
                        autoFocus
                        onChange={handleChange}
                        name="broj_telefona"
                        value={adminData.broj_telefona}
                        />
                    {num > 0 && <ErrorFinder err={errorsData} fieldName="broj_telefona"/>}
                </div>
                <div>
                    <Form.Label>Spol</Form.Label>
                    <Form.Select 
                        aria-label="Default select example" 
                        value={adminData.spol}
                        onChange={handleChange}
                        name="spol">
                            <option>- Choose one option -</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Form.Select>
                    {num  > 0 && <ErrorFinder err={errorsData} fieldName="spol"/>}

                </div>
            </Form.Group>
         
            <Button variant="primary" type="submit">
                Add new Admin
            </Button>
            </Form>
            </>
  );
}