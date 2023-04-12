import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ErrorFinder from '../../components/ErrorFinder';
import useResponsive from '../../components/useResponsive';
import Container from 'react-bootstrap/esm/Container';


export default function AddMobile(){

    const {isMobile, isDesktop} = useResponsive();

    const [errors, setErrors] = useState([]);
    const [brands, setBrands] = useState([]);
    const [mobileData, setMobileData] = useState({
        mobile_name:"",
        ram:"",
        internal:"",
        processor:"",
        screen_size:"",
        battery:"",
        photo:"",
        os:"",
        quantity:"",
        camera:"",
        price:"",
        BrandId:"",
    })
    useEffect(() =>{
        getBrands();
    }, [])

    function handleSubmit(event){
        event.preventDefault();

        axios.post("http://localhost:3001/post-mobile", mobileData, {
            headers:{
                'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(() => {
            const emptyData =  Object.fromEntries(Object.entries(mobileData).map(([key, value]) => [key, ""]))
            setMobileData(emptyData);
            setErrors([]);
        })
        .catch(error=>{
            setErrors(error.response.data.errors);
        })
    }
    const getBrands = () =>{
        axios.get("http://localhost:3001/brands")
        .then(response => setBrands(response.data))
        .catch(error => console.log(error))
    }
    
    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        
        setMobileData(n => ({
            ...n,
            [name]: value
        }))
        
    }

    let num = errors.length;

    return(
        <>
        <h1>Add new Mobile</h1>
        <Form onSubmit={handleSubmit} className={`d-flex ${!isDesktop ? `w-75` : `w-50`} flex-column align-items-center justify-content-center flex-wrap`}>
        <Form.Group className={`d-flex ${isMobile && `flex-wrap`} mb-3 align-items-center justify-content-center w-100 mt-2 mb-3`} >
            <Container className={`${isMobile ? `` : `me-2` } w-100 p-0`}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text" 
                    autoFocus
                    name='mobile_name'
                    onChange={handleChange}
                    value={mobileData.mobile_name}
                    />
                {num > 0 && <ErrorFinder err={errors} fieldName="mobile_name"/>}

            </Container>
            <Container  className={`${isMobile ? `w-100 mt-2` : `w-50` } p-0`}>
                <Form.Label>Brand</Form.Label>
                <Form.Select
                aria-label="Default select example" 
                
                name="BrandId"
                onChange={handleChange}
                value={mobileData.BrandId}>
                        <option value="">- Choose one option -</option>
                        {brands.map(n => (
                            <option key={n.id} value={n.id}>{n.name}</option>
                        ))}
                </Form.Select>
                {num > 0 && <ErrorFinder err={errors} fieldName="BrandId"/>}

           </Container>
        </Form.Group>

    <Form.Group className={`d-flex mb-3 ${isMobile ? `flex-wrap` : `` } w-100`}>
        <Container className="w-100 p-0">
            <Form.Label>RAM</Form.Label>
                <Form.Select 
                aria-label="Default select example" 
  
                name="ram"
                onChange={handleChange}
                value={mobileData.ram}>

                    <option>- Choose one option -</option>
                    <option value="16">16</option>
                    <option value="12">12</option>
                    <option value="8">8</option>
                    <option value="6">6</option>
                    <option value="4">4</option>
                </Form.Select>
                {num > 0 && <ErrorFinder err={errors} fieldName="ram"/>}

        </Container>
        <Container className={`${isMobile ? `mt-2` : `ms-2`} w-100 p-0`}>
            <Form.Label>Memory</Form.Label>
            <Form.Select 
                aria-label="Default select example" 
  
                name="internal"
                onChange={handleChange}
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
                {num > 0 && <ErrorFinder err={errors} fieldName="internal"/>}

        </Container>
        
    </Form.Group>
    <Form.Group className={` d-flex flex-wrap mb-3 w-100`}>
    <Form.Label>Camera</Form.Label>
            <Form.Control 
                type="text" 
                autoFocus
                name='camera'
                onChange={handleChange}
                value={mobileData.camera}
                />
                {num > 0 && <ErrorFinder err={errors} fieldName="camera"/>}
    </Form.Group>
    
    <Form.Group className={`d-flex w-100 justify-content-center  ${isMobile && `flex-wrap`} mb-3`}>
        <Container className="w-100 p-0">
        <Form.Label>Processor</Form.Label>
            <Form.Control 
                type="text" 
                autoFocus
                name='processor'
                onChange={handleChange}
                value={mobileData.processor}
                />
        {num > 0 && <ErrorFinder err={errors} fieldName="processor"/>}
        </Container>
        <Container className={`${isMobile ? `w-100`  : `w-50 ms-2`} p-0`}>
            <Form.Label>Screen size</Form.Label>
            <Form.Control 
                type="text" 
                autoFocus
                placeholder='6.8'
                name='screen_size'
                onChange={handleChange}
                value={mobileData.screen_size}
                />
        {num > 0 && <ErrorFinder err={errors} fieldName="screen_size"/>}
        </Container>
    </Form.Group>
    <Form.Group className={`d-flex mb-3 ${isMobile ? `flex-wrap`  : ``} w-100`}>
        <Container className={`${isMobile ? `w-100`  : `w-50`} p-0`}>
            <Form.Label>Baterry</Form.Label>
            <Form.Control 
                type="text" 
                autoFocus
                placeholder='5000'
                name='battery'
                onChange={handleChange}
                value={mobileData.battery}
                />
        {num > 0 && <ErrorFinder err={errors} fieldName="battery"/>}
        </Container>
        <Container className={`${isMobile ? `w-100`  : `w-50 ms-2`} p-0`}>
            <Form.Label>OS</Form.Label>
            <Form.Control 
                type="text" 
                autoFocus
                placeholder='Android 13'
                name='os'
                onChange={handleChange}
                value={mobileData.os}
                />
            {num > 0 && <ErrorFinder err={errors} fieldName="os"/>}
        </Container>
    </Form.Group>
    <Form.Group className={`d-flex justify-content-center w-100 ${isMobile && `flex-wrap`} mb-3`}>
        <Container className={`${isMobile ? `w-100`  : `w-50 me-1`} p-0`}>
            <Form.Label>Quantity</Form.Label>
            <Form.Control 
                type="number" 
                autoFocus
                name='quantity'
                onChange={handleChange}
                value={mobileData.quantity}
                />
        {num > 0 && <ErrorFinder err={errors} fieldName="quantity"/>}
        </Container>
        <Container className={`${isMobile ? `w-100`  : `w-100`} p-0`}>
            <Form.Label>Price</Form.Label>
            <Form.Control 
                type="number" 
                autoFocus
                placeholder='3000'
                name='price'
                    onChange={handleChange}
                    value={mobileData.price}
                />
        {num > 0 && <ErrorFinder err={errors} fieldName="price"/>}
        </Container>
    </Form.Group>
        <Form.Group className="w-100 mb-3">
            <Form.Label>Photo link</Form.Label>
                <Form.Control 
                    type="text" 
                    autoFocus
                    name='photo'
                    onChange={handleChange}
                    value={mobileData.photo}
                    />
                {num > 0 && <ErrorFinder err={errors} fieldName="photo"/>}

        </Form.Group>
        <Form.Group>
            <Button style={{backgroundColor:"#219aeb", border: "none"}} type="submit">
            Add new mobile
            </Button>
        </Form.Group>
    </Form>
    </>
    )
}