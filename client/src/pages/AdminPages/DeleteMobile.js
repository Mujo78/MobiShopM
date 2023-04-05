import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Accordion from 'react-bootstrap/Accordion';
import Button from "react-bootstrap/esm/Button";
import AccordionButton from "react-bootstrap/esm/AccordionButton";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import Paginate from "../../components/Paginate";
import useResponsive from "../../components/useResponsive";

export default function DeleteMobile(){

    const [mobileData, setMobileData] = useState([]);
    const [brandsData, setBrandsData] = useState([]);

    const [errorsMobile, setErrorsMobile] = useState([]);
    const [errorsBrands, setErrorsBrands] = useState([]);

    const {isMobile, isTablet} = useResponsive();
    const [perPage] = useState(isTablet ? 3 : 4);
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastRecord = currentPage * perPage;
    const indexOfFirstRecord = indexOfLastRecord - perPage;
    const nPages = Math.ceil(brandsData.length / perPage);
    
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
    
    const getMobilesForBrand = (id) =>{
        axios.get(`http://localhost:3001/mobile/${id}`)
        .then(response=> {
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

    const activeKeys = ["0", "1", "2", "3"]
    return(
        <Container className="d-flex flex-column flex-grow-1">
        <h1>Delete Mobile</h1>
       <Container className={`d-flex p-0 ${isMobile && `justify-content-center`} flex-wrap mb-1 mt-3`}>
            {numErrorsBrands <= 0 ? 
            brandsData
            .slice(indexOfFirstRecord, indexOfLastRecord)
            .map(n => (
                <Accordion key={n.id} activeKey={activeKeys} className="me-2 mb-2">
                <Accordion.Item eventKey="0">
                <AccordionButton onClick={()=> getMobilesForBrand(n.id)}>{n.name}</AccordionButton>
                  <Accordion.Body>
                    <ListGroup style={{maxHeight:"270px", overflowX: "hidden", overflowY:"auto"}}>
                        <ListGroup.Item>
                            <Button  onClick={() => deleteBrand(n.id, n.name)} variant="danger" style={{border: "none"}}>Delete brand</Button>
                        </ListGroup.Item>
                        {numErrorsMobile <= 0 ?  mobileData[n.id] && mobileData[n.id]
                        .map(m => (
                            <ListGroup.Item key={m.id}>
                                <Container className="d-flex p-0 flex-column">
                                    <h5>{m.mobile_name}</h5>
                                    <p>{m.internal}GB {m.ram}GB RAM</p>
                                </Container>
                                <Button onClick={() =>deleteMobile(n.id,m.id, m.mobile_name)} style={{backgroundColor: "#219aeb", border: "none"}}>Delete mobile</Button>
                            </ListGroup.Item>
                        ))  : <Alert variant="danger">{errorsMobile}</Alert>}
                        
                    </ListGroup>
                 </Accordion.Body>
                </Accordion.Item>
              </Accordion>)) : <Alert variant="danger">{errorsBrands}</Alert>}
         </Container>
         <Container className="d-flex justify-content-center mt-1">
         <Paginate
            nPages = { nPages }
            currentPage = { currentPage } 
            setCurrentPage = { setCurrentPage }
         />

         </Container>

        </Container>
    )
}