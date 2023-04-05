import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import axios from "axios";
import ErrorFinder from "../../components/ErrorFinder";
import useResponsive from "../../components/useResponsive";

export default function AddBrand(){

    const {isMobile} = useResponsive();
    const [errors, setErrors] = useState([]);
    const [brandName, setBrandName] = useState({
        name:""
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
                name:""
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
                        name="name"
                        value={brandName.name}
                        onChange={handleChangeName}
                        />
                </Form.Group>
                {num > 0 && <ErrorFinder err={errors} fieldName="name"/>}
                <Form.Group className='mt-3'>
                    <Button style={{backgroundColor:"#219aeb", border: "none"}} className={` ${isMobile ? "w-100" : "w-25"}`} type="submit">
                        Save
                    </Button>
                </Form.Group>
            </Form>
            </Container>

    )
}