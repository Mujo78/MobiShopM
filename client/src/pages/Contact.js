import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import ErrorFinder from '../components/ErrorFinder';
import Footer from "../components/Footer";
import useResponsive from '../components/useResponsive';


export default function Contact(){

    const {isTablet} = useResponsive();

    const [commentData, setCommentData] = useState({
        name:"",
        email:"",
        comment:""
    })
    const [errorData, setErrors] = useState([]);

    function handleSubmit(event){
        event.preventDefault();
        axios.post("http://localhost:3001/post-comment", commentData)
        .then(() => {
            setCommentData({
                name:"",
                email:"",
                comment:""
            })
            setErrors([]);

        }).catch(error => {
            setErrors(error.response.data.errors);
        })
    }

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setCommentData(n => {
            return{
                ...n,
                [name]: value
            }})
    }

    let num = errorData.length;

    return(
        <Container>
        <Container className='d-flex mt-5 mb-5 flex-column justify-content-center align-items-center'>
        <h1>Contact</h1>
        <br/>
            <Form onSubmit={handleSubmit} className="w-50">
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name='name'
                        value={commentData.name}
                        onChange={handleChange}
                        autoFocus />
                {num > 0 && <ErrorFinder err={errorData} fieldName="name" />}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="name@example.com"
                        name='email'
                        value={commentData.email}
                        onChange={handleChange}
                        autoFocus />
                {num > 0 && <ErrorFinder err={errorData} fieldName="email" />}
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control 
                        as="textarea"
                        rows={4}
                        name="comment"
                        value={commentData.comment}
                        onChange={handleChange}
                        autoFocus />
                {num > 0 && <ErrorFinder err={errorData} fieldName="comment" />}
                </Form.Group>
                <Form.Group>
                    <Button type="submit" style={{backgroundColor: "#219aeb", border: "none", borderRadius: 0}}>
                        Submit
                    </Button>
                </Form.Group>
        </Form>
      </Container>
      <br/><br/>
      <Container className={isTablet && "fixed-bottom b-0"} >
        <Footer />
      </Container>
      </Container>
    )
}