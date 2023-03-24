import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Form from 'react-bootstrap/Form';
import ErrorFinder from "../components/ErrorFinder";

export default function EditMobile(){

    const [allBrands, setAllBrands] = useState([]);
    const [errorForm, setErrorsForm] = useState([]);
    const [allMobiles, setAllMobiles] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [mobileData, setMobileData] = useState({
        id:"",
        naziv:"",
        ram:"",
        internal:"",
        procesor:"",
        velicinaEkrana:"",
        baterija:"",
        photo:"",
        os:"",
        kamera:"",
        kolicina:0,
        cijena:"",
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
        axios.get(`http://localhost:3001/mobitel/${id}`)
        .then((response) => {
        
        setMobileData({
            id:response.data.id,
            naziv: response.data.naziv,
            ram:response.data.ram,
            internal:response.data.internal,
            procesor:response.data.procesor,
            velicinaEkrana:response.data.velicinaEkrana,
            baterija:response.data.baterija,
            kolicina:response.data.kolicina,
            photo:response.data.photo,
            os:response.data.os,
            kamera:response.data.kamera,
            cijena:response.data.cijena,
            BrandId:response.data.BrandId
        })
        setShowForm(true)
        })
        .catch(error => console.log(error)) 
    }

    const handleSubmit = (event) =>{
        event.preventDefault();

        axios.put(`http://localhost:3001/edit-mobitel/${mobileData.id}`,mobileData, {
            headers:{
                'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then((response) =>  {

            setMobileData({
                id:response.data.id,
                naziv: response.data.naziv,
                ram:response.data.ram,
                internal:response.data.internal,
                procesor:response.data.procesor,
                velicinaEkrana:response.data.velicinaEkrana,
                baterija:response.data.baterija,
                photo:response.data.photo,
                os:response.data.os,
                kolicina: response.data.kolicina,
                kamera:response.data.kamera,
                cijena:response.data.cijena,
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
        <ListGroup className="d-flex flex-row align-items-center justify-content-center">
            {allBrands.map(n => (
                <Button key={n.id} variant="light" className="ms-3" onClick={() => getMobilesByBrands(n.id)}>
                    <h6>{n.ime}</h6>
                    </Button>
            )) }
        </ListGroup>

        <Container className="d-flex flex-wrap">        
            <ListGroup variant="flush" className="mt-4 w-25">
                {allMobiles.map(m => (
                    <ListGroup.Item key={m.id} variant="light" className="d-flex flex-wrap justify-content-between align-items-center">
                        <h6>{m.naziv}</h6>
                        <Button onClick={() => showDataForMobile(m.id)}>Edit</Button>
                        </ListGroup.Item>
                ))}
            </ListGroup>
        
        {showForm &&
        <Form onSubmit={handleSubmit} className='mx-auto mt-4 d-flex flex-column align-items-center justify-content-center flex-wrap'>
        <Form.Group className='d-flex flex-wrap' >
            <div>
                <img src={mobileData.photo === "" ? "" : mobileData.photo} alt=""  style={{width:"210px"}} className="mt-5" />
            </div>
            <div className='ms-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text" 
                    autoFocus
                    name="naziv"
                    onChange={handleChange}
                    value={mobileData.naziv}
                    />
                {numErr > 0 && <ErrorFinder err={errorForm} fieldName="naziv" />}

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
                    name="velicinaEkrana"
                    value={mobileData.velicinaEkrana}
                />
                {numErr > 0 && <ErrorFinder err={errorForm} fieldName="velicinaEkrana" />}

                <Form.Label>Quantity</Form.Label>
                <Form.Control 
                    type="number" 
                    autoFocus
                    onChange={handleChange}
                    min={1}
                    max={10}
                    name="kolicina"
                    value={mobileData.kolicina}
                />
                {numErr > 0 && <ErrorFinder err={errorForm} fieldName="kolicina" />}


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
        <div className='me-3'>
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
        <div >
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
        <div className='me-3'>
        <Form.Label>Processor</Form.Label>
            <Form.Control 
                type="text" 
                autoFocus
                onChange={handleChange}
                name="procesor"
                value={mobileData.procesor}
                />
                {numErr > 0 && <ErrorFinder err={errorForm} fieldName="procesor" />}
        </div>
        <div>
        <Form.Label>Baterry</Form.Label>
            <Form.Control 
                type="text" 
                autoFocus
                onChange={handleChange}
                placeholder='5000mAh'
                name="baterija"
                value={mobileData.baterija}
                />
                {numErr > 0 && <ErrorFinder err={errorForm} fieldName="baterija" />}
        </div>
    </Form.Group>
    <Form.Group className='d-flex flex-wrap'>
        <div className='me-3'>
            <Form.Label>Price</Form.Label>
            <Form.Control 
                type="text" 
                autoFocus
                onChange={handleChange}
                placeholder='3000'
                name="cijena"
                value={mobileData.cijena}
                />
                {numErr > 0 && <ErrorFinder err={errorForm} fieldName="cijena" />}
        </div>
        <div>
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
                name="kamera"
                value={mobileData.kamera}
                />
                {numErr > 0 && <ErrorFinder err={errorForm} fieldName="kamera" />}
       
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