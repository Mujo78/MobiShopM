import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Form from 'react-bootstrap/Form';
import ErrorFinder from "../components/ErrorFinder";
import useResponsive from "../components/useResponsive";

export default function EditMobile(){

    const {isMobile} = useResponsive();

    const [allBrands, setAllBrands] = useState([]);
    const [errorForm, setErrorsForm] = useState([]);
    const [allMobiles, setAllMobiles] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [mobileData, setMobileData] = useState({
        id:"",
        mobile_name:"",
        ram:"",
        internal:"",
        processor:"",
        screen_size:"",
        battery:"",
        photo:"",
        os:"",
        camera:"",
        quantity:0,
        price:"",
        BrandId:""
    });

    useEffect(()=>{
        getBrands();
    }, [])

    const getBrands = () => {
        axios.get("http://localhost:3001/brands")
        .then(response =>{
            setAllBrands(response.data);
        }).catch(err =>{
            setAllBrands(err.response.data);
        })
        setShowForm(false)
    }

    const getMobilesByBrands = (id) => {
        
        axios.get(`http://localhost:3001/mobile/${id}`)
        .then((response) => {
            setAllMobiles(response.data)})
        .catch(err => console.log(err));
    }

    const showDataForMobile = (id) => {
        axios.get(`http://localhost:3001/mobile-phone/${id}`)
        .then((response) => {
        
        setMobileData({
            id:response.data.id,
            mobile_name: response.data.mobile_name,
            ram:response.data.ram,
            internal:response.data.internal,
            processor:response.data.processor,
            screen_size:response.data.screen_size,
            battery:response.data.battery,
            quantity:response.data.quantity,
            photo:response.data.photo,
            os:response.data.os,
            camera:response.data.camera,
            price:response.data.price,
            BrandId:response.data.BrandId
        })
        setShowForm(true)
        })
        .catch(error => console.log(error)) 
    }

    const handleSubmit = (event) =>{
        event.preventDefault();

        axios.put(`http://localhost:3001/edit-mobile/${mobileData.id}`,mobileData, {
            headers:{
                'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then((response) =>  {

            setMobileData({
                id:response.data.id,
                mobile_name: response.data.mobile_name,
                ram:response.data.ram,
                internal:response.data.internal,
                processor:response.data.processor,
                screen_size:response.data.screen_size,
                battery:response.data.battery,
                photo:response.data.photo,
                os:response.data.os,
                quantity: response.data.quantity,
                camera:response.data.camera,
                price:response.data.price,
                BrandId:response.data.BrandId
            })
            setErrorsForm([]);
        })
        .catch(err => setErrorsForm(err.response.data.errors))
    }
    const handleChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;

        setMobileData(n => ({
            ...n,
            [name]:value
        }))
    }
    let numErr = errorForm.length;
   
    return(
        <Container>
        <h1>Edit Mobile</h1>
        <ListGroup className="d-flex flex-row flex-wrap align-items-center justify-content-center">
            {allBrands.map(n => (
                <Button key={n.id} variant="light" className="ms-3 mt-2" onClick={() => getMobilesByBrands(n.id)}>
                    <h6>{n.name}</h6>
                    </Button>
            )) }
        </ListGroup>

        <Container className="d-flex flex-wrap">        
            <ListGroup variant="flush" className={`mt-4 ${isMobile ? `w-100 `: `w-25`}`} style={{maxHeight:"120px", overflowY:"auto"}}>
                {allMobiles.map(m => (
                    <ListGroup.Item key={m.id} variant="light" className="d-flex flex-wrap justify-content-between align-items-center">
                        <h6>{m.mobile_name}</h6>
                        <Button onClick={() => showDataForMobile(m.id)}>Edit</Button>
                        </ListGroup.Item>
                ))}
            </ListGroup>
        
        {showForm &&
        <Form onSubmit={handleSubmit} className='mx-auto mt-4 d-flex flex-column align-items-center justify-content-center flex-wrap'>
        <Form.Group className='d-flex flex-wrap justify-content-center' >
            <div>
                <img src={mobileData.photo === "" ? "" : mobileData.photo} alt=""  style={{width:"210px"}} className="mt-5" />
            </div>
            <div className={`${isMobile ? `w-100` : `ms-3`}`}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text" 
                    autoFocus
                    name="mobile_name"
                    onChange={handleChange}
                    value={mobileData.mobile_name}
                    />
                {numErr > 0 && <ErrorFinder err={errorForm} fieldName="mobile_name" />}

                <Form.Label>Brand</Form.Label>
                <Form.Select 
                    aria-label="Default select example" 
                    name="BrandId"
                    onChange={handleChange}
                    value={mobileData.BrandId}>

                        <option>- Choose one option -</option>
                        <option value="1">Samsung</option>
                        <option value="2">Apple</option>
                        <option value="3">Huawei</option>
                        <option value="4">Xiaomi</option>
                        <option value="5">LG</option>
                </Form.Select>
                {numErr > 0 && <ErrorFinder err={errorForm} fieldName="BrandId" />}

                <Form.Label>Screen size</Form.Label>
                <Form.Control 
                    type="text" 
                    autoFocus
                    onChange={handleChange}
                    placeholder='6.8"'
                    name="screen_size"
                    value={mobileData.screen_size}
                />
                {numErr > 0 && <ErrorFinder err={errorForm} fieldName="screen_size" />}

                <Form.Label>Quantity</Form.Label>
                <Form.Control 
                    type="number" 
                    autoFocus
                    onChange={handleChange}
                    min={1}
                    max={10}
                    name="quantity"
                    value={mobileData.quantity}
                />
                {numErr > 0 && <ErrorFinder err={errorForm} fieldName="quantity" />}


           </div>
        </Form.Group>
        <Form.Group className='d-flex flex-wrap w-100'>
        <Form.Label>Photo link</Form.Label>
            <Form.Control 
                type="text" 
                autoFocus
                onChange={handleChange}
                name="photo"
                value={mobileData.photo}
                />
            {numErr > 0 && <ErrorFinder err={errorForm} fieldName="photo" />}
    </Form.Group>

    <Form.Group className='d-flex flex-wrap'>
        <div className={`${isMobile ? `w-100` : `me-3`}`}>
            <Form.Label>RAM</Form.Label>
                <Form.Select 
                aria-label="Default select example" 
                onChange={handleChange}
                name="ram"
                value={mobileData.ram}>

                    <option>- Choose one option -</option>
                    <option value="16">16</option>
                    <option value="12">12</option>
                    <option value="8">8</option>
                    <option value="6">6</option>
                    <option value="4">4</option>
                </Form.Select>
                {numErr > 0 && <ErrorFinder err={errorForm} fieldName="ram" />}

        </div>
        <div className={`${isMobile ? `w-100` : ``}`}>
            <Form.Label>Memory</Form.Label>
            <Form.Select 
                aria-label="Default select example" 
                onChange={handleChange}
                name="internal"
                value={mobileData.internal}
                >
                    <option>- Choose one option -</option>
                    <option value="512">512</option>
                    <option value="256">256</option>
                    <option value="128">128</option>
                    <option value="64">64</option>
                    <option value="32">32</option>
                    <option value="16">16</option>
                    <option value="8">8</option>
                    <option value="4">4</option>
                </Form.Select>
                {numErr > 0 && <ErrorFinder err={errorForm} fieldName="internal" />}
        </div>
        
    </Form.Group>
    

    <Form.Group className='d-flex flex-wrap'>
        <div className={`${isMobile ? `w-100` : `me-3`}`}>
        <Form.Label>Processor</Form.Label>
            <Form.Control 
                type="text" 
                autoFocus
                onChange={handleChange}
                name="processor"
                value={mobileData.processor}
                />
                {numErr > 0 && <ErrorFinder err={errorForm} fieldName="processor" />}
        </div>
        <div className={`${isMobile ? `w-100` : ``}`}>
        <Form.Label>Baterry</Form.Label>
            <Form.Control 
                type="text" 
                autoFocus
                onChange={handleChange}
                placeholder='5000mAh'
                name="battery"
                value={mobileData.battery}
                />
                {numErr > 0 && <ErrorFinder err={errorForm} fieldName="battery" />}
        </div>
    </Form.Group>
    <Form.Group className='d-flex flex-wrap'>
        <div className={`${isMobile ? `w-100` : `me-3`}`}>
            <Form.Label>Price</Form.Label>
            <Form.Control 
                type="text" 
                autoFocus
                onChange={handleChange}
                placeholder='3000'
                name="price"
                value={mobileData.price}
                />
                {numErr > 0 && <ErrorFinder err={errorForm} fieldName="price" />}
        </div>
        <div className={`${isMobile ? `w-100` : ``}`}>
            <Form.Label>OS</Form.Label>
            <Form.Control 
                type="text" 
                autoFocus
                onChange={handleChange}
                placeholder='Android 13'
                name="os"
               value={mobileData.os}
                />
                {numErr > 0 && <ErrorFinder err={errorForm} fieldName="os" />}
        </div>
    </Form.Group>
    <Form.Group className='d-flex flex-wrap mb-3 w-100'>
            <Form.Label>Camera</Form.Label>
            <Form.Control 
                type="text" 
                autoFocus
                onChange={handleChange}
                name="camera"
                value={mobileData.camera}
                />
                {numErr > 0 && <ErrorFinder err={errorForm} fieldName="camera" />}
       
        </Form.Group>
            <Form.Group>
                <Button style={{backgroundColor:"#219aeb"}} type="submit">
                Save changes
                </Button>
            </Form.Group>
        </Form> 
        }
        
        </Container>

        </Container>
    )
}