import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import axios from "axios";
import ErrorFinder from "../components/ErrorFinder";

export default function AddBrand(){

    const [errors, setErrors] = useState([]);
    const [brandName, setBrandName] = useState({
        ime:""
    });

    function handleSubmit(event){
        event.preventDefault();

        axios.post("http://localhost:3001/add-brand", brandName, {
            headers:{
                'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(() =>
        {
            
            setBrandName({
                ime:""
            })
            setErrors([]);    
        })
        .catch(error => {
           setErrors(error.response.data.errors);
        })
    }
    const handleChangeName = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setBrandName(n => ({
            ...n,
            [name] : value
        }))
    }
    let num = errors.length;

    return(

        <Container>
            <h1>Add new Brand</h1>
            <Form  onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Brand name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Samsung"
                        name="ime"
                        value={brandName.ime}
                        onChange={handleChangeName}
                        />
                </Form.Group>
                {num > 0 && <ErrorFinder err={errors} fieldName="ime"/>}
                <Form.Group className="mt-3">
                    <Button style={{backgroundColor:"#219aeb"}} type="submit">
                        Save
                    </Button>
                </Form.Group>
            </Form>
            </Container>

    )
}