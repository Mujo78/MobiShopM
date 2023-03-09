/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react"
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";

import ListGroup from 'react-bootstrap/ListGroup';
import Row from "react-bootstrap/esm/Row";
import { Link, useParams } from "react-router-dom";
import BrandNav from "../components/BrandNavs";

import Cards from "../components/Card";

export default function Models(){

    const [mobileData, setMobileData] = useState([]);
    const [brands, setBrands] = useState([]);
    const {brandName} = useParams();
    
    useEffect(() => {
        axios.get("http://localhost:3001/brands")
        .then(response => {
            setBrands(response.data);
        }).catch(error =>{
            console.log(error);
        })
        axios.get(`http://localhost:3001/mobiteli${brandName ? `/${brandName}` : ""}`)
        .then(response => {
            setMobileData(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }, [brandName])

    const data = mobileData.map(n =>{
        return <Cards  key={n.id} mob={n}/>
    })

    const brandsData = brands.map(n =>{
        return <BrandNav  key={n.id} b={n}/>
    })
    return(
        <>
        <div className="d-flex flex-row mt-4">
            <div className="d-flex flex-column w-50 jusify-center">
                <ListGroup>
                    <ListGroup.Item className="mb-2 text-center w-50" as={Link} to={`/models`} action variant="primary">All</ListGroup.Item>
                </ListGroup>
                {brandsData}
            </div>
            <div className="d-flex flex-grow-1 flex-wrap flex-row">
               {data}
            </div>
        </div>
        <Container className="fixed-bottom">
            <Row style={{backgroundColor:"#219aeb"}} className="text-center">
                <Col xs={{ offset: 3, span: 6 }}>Copyrights © 2023 Mshop.com</Col>
            </Row>
        </Container>
        </>
    )
}