import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Accordion from 'react-bootstrap/Accordion';
import Button from "react-bootstrap/esm/Button";
import AccordionButton from "react-bootstrap/esm/AccordionButton";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";

export default function DeleteMobile(){

    const [mobileData, setMobileData] = useState([]);
    const [brandsData, setBrandsData] = useState([]);

    const [errorsMobile, setErrorsMobile] = useState([]);
    const [errorsBrands, setErrorsBrands] = useState([]);

    useEffect(() => {
        getBrands();
    }, [])

    const getBrands = () => {
        axios.get("http://localhost:3001/brands")
        .then(response =>{
            setBrandsData(response.data);
        }).catch(err =>{
            setErrorsBrands(err.response.data);
        })
    }
    console.log(mobileData[1]);

    const getMobilesForBrand = (id) =>{
        axios.get(`http://localhost:3001/mobile/${id}`)
        .then(response=> {
            console.log(response)
            setMobileData(n => ({
                ...n,
                [id]:response.data
            }));
        })
        .catch(err =>{
            setErrorsMobile(err.response.data);
        })
    }

    let numErrorsMobile = errorsMobile.length;
    let numErrorsBrands = errorsBrands.length;

    const deleteMobile = (brandID,id, name) => {
        axios.delete(`http://localhost:3001/delete-mob/${name}`, {
            headers:{
                'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(setMobileData(mob => ({
            ...mob,
            [brandID]:mob[brandID].filter(m => m.id !== id)
        })))
        .catch(error => console.log(error))
    }
    const deleteBrand = (id,name) => {
        axios.delete(`http://localhost:3001/delete-brand/${name}`, {
            headers:{
                'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(setBrandsData(brandsData.filter(n => n.id !== id)))
        .catch(err => console.log(err));
    }

    return(
        <Container className="d-flex flex-column flex-grow-1">
        <h1>Delete Mobile</h1>
       <div className="d-flex flex-wrap mb-1 mt-1">
            {numErrorsBrands <= 0 ? brandsData.map(n => (
                <Accordion key={n.id} className="me-2">
                <Accordion.Item eventKey="0">
                <AccordionButton onClick={()=> getMobilesForBrand(n.id)}>{n.ime}</AccordionButton>
                  <Accordion.Body>
                    <ListGroup>
                        <ListGroup.Item>
                            <Button  onClick={() => deleteBrand(n.id, n.ime)}>Delete brand</Button>
                        </ListGroup.Item>
                        {numErrorsMobile <= 0 ?  mobileData[n.id] && mobileData[n.id].map(m => (
                            <ListGroup.Item key={m.id}>
                                <div className="d-flex flex-column">
                                    <h5>{m.naziv}</h5>
                                    <p>{m.internal}GB {m.ram}GB RAM</p>
                                </div>
                                <Button onClick={() =>deleteMobile(n.id,m.id, m.naziv)}>Delete mobile</Button>
                            </ListGroup.Item>
                        ))  : <Alert variant="danger">{errorsMobile}</Alert>}
                    </ListGroup>
                 </Accordion.Body>
                </Accordion.Item>
              </Accordion>)) : <Alert variant="danger">{errorsBrands}</Alert>}
         </div>
        </Container>
    )
}