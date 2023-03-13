import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ErrorFinder from '../components/ErrorFinder';


export default function AddMobile(){
    const [errors, setErrors] = useState([]);
    const [mobileData, setMobileData] = useState({
        naziv:"",
        ram:"",
        internal:"",
        procesor:"",
        velicinaEkrana:"",
        baterija:"",
        photo:"",
        os:"",
        kamera:"",
        cijena:"",
        BrandId:"",
    })
    function handleSubmit(event){
        event.preventDefault();

        axios.post("http://localhost:3001/post-mobitel", mobileData, {
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
        <Form onSubmit={handleSubmit} className=' d-flex flex-column align-items-center justify-content-center flex-wrap'>
        <Form.Group className='d-flex flex-wrap' >
            <div className='me-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text" 
                    autoFocus
                    name='naziv'
                    onChange={handleChange}
                    value={mobileData.naziv}
                    />
                {num > 0 && <ErrorFinder err={errors} fieldName="naziv"/>}

            </div>
            <div>
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
                {num > 0 && <ErrorFinder err={errors} fieldName="BrandId"/>}

           </div>
        </Form.Group>

    <Form.Group className='d-flex flex-wrap'>
        <div className='me-3'>
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

        </div>
        <div >
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

        </div>
        
    </Form.Group>
    <Form.Group className='d-flex flex-wrap w-100'>
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

    <Form.Group className='d-flex flex-wrap'>
        <div className='me-3'>
        <Form.Label>Processor</Form.Label>
            <Form.Control 
                type="text" 
                autoFocus
                name='procesor'
                onChange={handleChange}
                value={mobileData.procesor}
                />
        {num > 0 && <ErrorFinder err={errors} fieldName="procesor"/>}
        </div>
        <div>
            <Form.Label>Screen size</Form.Label>
            <Form.Control 
                type="text" 
                autoFocus
                placeholder='6.8"'
                name='velicinaEkrana'
                onChange={handleChange}
                value={mobileData.velicinaEkrana}
                />
        {num > 0 && <ErrorFinder err={errors} fieldName="velicinaEkrana"/>}
        </div>
    </Form.Group>
    <Form.Group className='d-flex flex-wrap'>
        <div className='me-3'>
            <Form.Label>Baterry</Form.Label>
            <Form.Control 
                type="text" 
                autoFocus
                placeholder='5000mAh'
                name='baterija'
                onChange={handleChange}
                value={mobileData.baterija}
                />
        {num > 0 && <ErrorFinder err={errors} fieldName="baterija"/>}
        </div>
        <div>
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
        </div>
    </Form.Group>
    <Form.Group className='d-flex flex-wrap mb-3'>
        <div className='me-3'>
            <Form.Label>Camera</Form.Label>
            <Form.Control 
                type="text" 
                autoFocus
                name='kamera'
                onChange={handleChange}
                value={mobileData.kamera}
                />
        {num > 0 && <ErrorFinder err={errors} fieldName="kamera"/>}
        </div>
        <div>
            <Form.Label>Price</Form.Label>
            <Form.Control 
                type="text" 
                autoFocus
                placeholder='3000'
                name='cijena'
                    onChange={handleChange}
                    value={mobileData.cijena}
                />
        {num > 0 && <ErrorFinder err={errors} fieldName="cijena"/>}
        </div>
    </Form.Group>
        <Form.Group>
            <Button style={{backgroundColor:"#219aeb"}} type="submit">
            Add new Admin
            </Button>
        </Form.Group>
    </Form>
    </>
    )
}