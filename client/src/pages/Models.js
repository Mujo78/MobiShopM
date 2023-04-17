/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react"

import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useSearchParams } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import Container from "react-bootstrap/esm/Container";
import Cards from "../components/Card";
import Paginate from "../components/Paginate";
import useResponsive from "../components/useResponsive";
import Button from "react-bootstrap/esm/Button";
import Alert from "react-bootstrap/esm/Alert";

export default function Models(){

    const [searchParams, setSearchParams] = useSearchParams();
    const brandIdFilter = searchParams.get("brand_id"); 

    const {isMobile, isTablet, isDesktop} = useResponsive();
    const [showOffMobile, setShowOffMobile] = useState(false);
    const [mobileData, setMobileData] = useState([]);
    const [brands, setBrands] = useState([]);
    let num = isTablet ? 6 : 8

    const [perPage] = useState(num);
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastRecord = currentPage * perPage;
    const indexOfFirstRecord = indexOfLastRecord - perPage;

    useEffect(() => {
        axios.get("http://localhost:3001/brands")
        .then(response => {
            setBrands(response.data);
        }).catch(error =>{
            console.log(error);
        })
        axios.get(`http://localhost:3001/mobiles`)
        .then(response => {
            setMobileData(response.data);
            setCurrentPage(1);
            isMobile && closeIt();
        }).catch(error =>{
            console.log(error);
        })
    }, [searchParams])

    const filteredData = brandIdFilter && 
        mobileData.filter(m => m.BrandId === parseInt(brandIdFilter));

    const data = (brandIdFilter ? filteredData : mobileData)
            .slice(indexOfFirstRecord, indexOfLastRecord)
            .map(n =>{
                return <Cards  key={n.id} mob={n}/>
    })
    const nPages = Math.ceil(brandIdFilter ? filteredData.length / perPage : mobileData.length / perPage);

    const genNewSearcParam = (key, value) =>{
        const sp = new URLSearchParams(searchParams)
        if (value === null) {
            sp.delete(key)
        } else {
            sp.set(key, value)
        }
        return `?${sp.toString()}`
    }

    const handleShowOff = () =>{
        setShowOffMobile(true);
    }
    const closeIt = () =>{
        setShowOffMobile(false);
    }
    return(
        <>
        <Container className={`d-flex p-0  ${isMobile ? `ms-0` : `ms-4`} me-0 w-100 flex-row mt-4 mb-4`}>
            
            {isMobile ?
            <Button style={{position:"fixed", right: 0, borderRadius:"120px",textAlign:"center", backgroundColor:"#ffffff", color:"#219aeb"}} onClick={handleShowOff}>B</Button>
            : <Container className="d-flex p-0 flex-column w-25 jusify-center">
                <ListGroup>
                    <ListGroup.Item 
                        className="mb-2 text-center w-50" 
                        as={Link} 
                        to="." 
                        style={{borderRadius: "0px", border:"none"}} 
                        variant="secondary" 
                        action>
                            All
                    </ListGroup.Item>
                    {brands.map(n =>
                        <ListGroup.Item key={n.id}
                                style={{borderRadius: "0px", border:"none"}} 
                                variant="secondary" 
                                action 
                                className="mb-2 text-center w-50" 
                                as={Link} 
                                to={genNewSearcParam("brand_id", n.id)} >
                                    {n.name}
                        </ListGroup.Item>
                    )}
                </ListGroup>
                
            </Container>}
            {mobileData.length > 0 ? 
            (
            <Container fluid className="d-flex w-75 p-0 flex-column">
            
            <Container fluid className={`d-flex mb-3 ${isMobile ? `justify-content-center` : `justify-content-start`} align-items-center p-0 flex-row flex-wrap`}>
               {data}
            </Container>
            <Container className="d-flex p-0 mt-auto justify-content-center mt-3">
            <Paginate
                nPages = { nPages }
                currentPage = { currentPage } 
                setCurrentPage = { setCurrentPage }/>
                </Container>
            </Container>) : <Alert className={`${isDesktop ? `w-75` : `w-100`} text-center`}>Our store is currently empty!</Alert>}
        </Container>
        <Offcanvas show={showOffMobile} placement="end" onHide={closeIt}>
                <Offcanvas.Header closeButton>
                    Brands filter
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container className="d-flex flex-column w-100 jusify-center">
                    <ListGroup>
                    <ListGroup.Item 
                        className="mb-2 text-center w-100" 
                        as={Link} 
                        to="."
                        onClick={closeIt}
                        style={{borderRadius: "0px", border:"none"}} 
                        variant="secondary" 
                        action>
                            All
                    </ListGroup.Item>
                    {brands.map(n =>
                        <ListGroup.Item key={n.id}
                                style={{borderRadius: "0px", border:"none"}} 
                                variant="secondary" 
                                action 
                                className="mb-2 text-center w-100" 
                                as={Link}
                                onClick={closeIt}
                                to={genNewSearcParam("brand_id", n.id)} >
                                    {n.name}
                        </ListGroup.Item>
                    )}
                </ListGroup>
                    </Container>
                </Offcanvas.Body>
                <Offcanvas.Header>
                    <Button className="w-100" onClick={closeIt}>Continue</Button>
                </Offcanvas.Header>
            </Offcanvas>
        </>
    )
}