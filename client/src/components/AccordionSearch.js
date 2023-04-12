/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import Form from 'react-bootstrap/Form';
import Accordion from "react-bootstrap/Accordion";
import axios from 'axios';
import useResponsive from './useResponsive';

export default function Accordions(props){
    const {isMobile, isTablet} = useResponsive();
    const getBrands = () =>{
        axios.get("http://localhost:3001/brands")
        .then(response => props.setBrands(response.data))
        .catch(error => console.log(error))
    }

    const searchButton = () => {
        axios.post("http://localhost:3001/search", props.searchFormDataState)
        .then(response => {
            props.setInfo();
            props.setSearchResult(response.data)
            props.setCurrentPage(1);
            isMobile && props.handleCloseFilter();
            
            props.setSearchFormDataState({mobile_name: "",ram:{ram16: false,ram12: false,ram8: false,ram6: false,ram4: false},
                                    screen_size:"",battery:"",
                                    internal:{internal512: false,internal256: false,internal128: false,internal64: false,
                                            internal32: false,internal16: false,internal8: false, internal4: false},
                                    os:"",price:{from:1,to:3000},BrandId:"All"})}
            
        )
        .catch(error => props.setInfo(error.response.data))

        isMobile && props.handleCloseFilter();
    }

    const handleChange = (event) =>{
        const {name,type, value,checked} = event.target;
        type === "checkbox"? 
            name.startsWith("ram") ? props.setSearchFormDataState(n => ({...n,
                ram:{...n.ram, [name]:checked}})) : props.setSearchFormDataState(n => ({...n,
                                                    internal:{...n.internal, [name]:checked}}))
                    : 
            props.setSearchFormDataState(n => ({...n,
                price:{...n.cijena, [name]: value==='' ? parseInt(0) : parseInt(value)},
                [name]: type=== "range" ? 
                                value === "" ? value.toString() : parseInt(value)
                            : value}))
    }

    useEffect(() =>{
        getBrands();
    }, [])

    const uncheckRam = () => {
        props.setSearchFormDataState(n => ({
            ...n,
            ram: Object.fromEntries(Object.keys(n.ram).map(k => [k, false]))
        }))
    }
    const uncheckInternal = () => {
        props.setSearchFormDataState(n => ({
            ...n,
            internal: Object.fromEntries(Object.keys(n.ram).map(k => [k, false]))
        }))
    }
    const screenSizeRestart = () =>{
        props.setSearchFormDataState(n => ({
            ...n,
            screen_size:""
        }))
    }
    const batteryRestart = () =>{
        props.setSearchFormDataState(n => ({
            ...n,
            battery:""
        }))
    }
    const osRestart = () => {
        props.setSearchFormDataState(n => ({
            ...n,
            os:""
        }))
    }

    const styles = {
        backgroundColor: "#219aeb",
        border: "none",
        borderRadius: 0
    }

    return(
        <Container className='w-100'>
        <FormGroup className='d-flex w-100 ms-auto me-auto mb-4 mt-4 justify-content-center align-items-center'>
            <Form.Control
                type="text"
                name="mobile_name"
                onChange={handleChange}
                value={props.searchFormDataState.mobile_name}
                placeholder="Samsung Galaxy S23 Ultra 5G"
            />
            <Button onClick={searchButton} style={styles}>Search</Button>
        </FormGroup>
        <Container className='w-100 fixed-left'>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>RAM</Accordion.Header>
                        <Accordion.Body>
                            <Form.Group>
                                <Form.Check
                                    type="checkbox" 
                                    label="16 GB"
                                    name='ram16'
                                    onChange={handleChange}
                                    checked={props.searchFormDataState.ram.ram16}
                                    value={props.searchFormDataState.ram.ram16}
                                    />
                                <Form.Check 
                                    type="checkbox"
                                    label="12 GB"
                                    name='ram12'
                                    onChange={handleChange}
                                    checked={props.searchFormDataState.ram.ram12}
                                    />
                                <Form.Check 
                                    type="checkbox"
                                    label="8 GB"
                                    name='ram8'
                                    onChange={handleChange}
                                    checked={props.searchFormDataState.ram.ram8}
                                    />
                                <Form.Check 
                                    type="checkbox"
                                    label="6 GB"
                                    name='ram6'
                                    onChange={handleChange}
                                    checked={props.searchFormDataState.ram.ram6}
                                    />
                                <Form.Check 
                                    type="checkbox" 
                                    label="4 GB"
                                    name='ram4'
                                    onChange={handleChange}
                                    checked={props.searchFormDataState.ram.ram4}
                                    />
                            </Form.Group>
                            <Container className='d-flex justify-content-end'>
                                <Button onClick={uncheckRam} variant='link' className='p-0'>Clear all</Button>                            
                            </Container>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Memory</Accordion.Header>
                        <Accordion.Body>
                        <Form.Group className="mb-3 d-flex flex-row flex-wrap">
                            <Container className={`p-0 m-0 ${isTablet ? `w-100` : `w-50`}`}>
                                <Form.Check
                                    type="checkbox" 
                                    label="512 GB"
                                    name='internal512'
                                    onChange={handleChange}
                                    checked={props.searchFormDataState.internal.internal512}

                                    />
                                <Form.Check 
                                    type="checkbox"
                                    label="256 GB"
                                    name='internal256'
                                    onChange={handleChange}
                                    checked={props.searchFormDataState.internal.internal256}
                                    />
                                <Form.Check 
                                    type="checkbox"
                                    label="128 GB"
                                    name='internal128'
                                    onChange={handleChange}
                                    checked={props.searchFormDataState.internal.internal128}
                                    />
                                <Form.Check 
                                    type="checkbox"
                                    label="64 GB"
                                    name='internal64'
                                    onChange={handleChange}
                                    checked={props.searchFormDataState.internal.internal64}
                                    />
                                </Container>
                                <Container className={`p-0 ${isTablet ? `w-100` : `w-50`}`}>
                                <Form.Check 
                                    type="checkbox" 
                                    label="32 GB"
                                    name='internal32'
                                    onChange={handleChange}
                                    checked={props.searchFormDataState.internal.internal32}
                                    />
                                <Form.Check 
                                    type="checkbox" 
                                    label="16 GB"
                                    name='internal16'
                                    onChange={handleChange}
                                    checked={props.searchFormDataState.internal.internal16}
                                    />
                                    <Form.Check 
                                    type="checkbox" 
                                    label="8 GB"
                                    name='internal8'
                                    onChange={handleChange}
                                    checked={props.searchFormDataState.internal.internal8}
                                    />
                                    <Form.Check 
                                    type="checkbox" 
                                    label="4 GB"
                                    name='internal4'
                                    onChange={handleChange}
                                    checked={props.searchFormDataState.internal.internal4}
                                    />
                                    </Container>
                            </Form.Group>
                            <Container className='d-flex justify-content-end'>
                                <Button  onClick={uncheckInternal} variant='link' className='p-0'>Clear all</Button>                            
                            </Container>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Screen size</Accordion.Header>
                        <Accordion.Body className='text-center'>
                            <Form.Label style={{fontSize:"15px"}} >{props.searchFormDataState.screen_size}"</Form.Label>
                            <Form.Range
                                type="range"
                                min={1.0}
                                max={8.0}
                                step={0.01}
                                value={props.searchFormDataState.screen_size}
                                name="screen_size"
                                onChange={handleChange}
                            />
                            <Container className='d-flex justify-content-end'>
                                <Button onClick={screenSizeRestart} variant='link' className='p-0'>Clear all</Button>                            
                            </Container>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Battery</Accordion.Header>
                        <Accordion.Body className='text-center'>
                            <Form.Label style={{fontSize:"15px"}} >{props.searchFormDataState.battery} mAh</Form.Label>
                            <Form.Range
                                type="range"
                                min={3000}
                                max={6000}
                                step={1}
                                value={props.searchFormDataState.battery}
                                name="battery"
                                onChange={handleChange}
                            />
                            <Container className='d-flex justify-content-end'>
                                <Button onClick={batteryRestart} variant='link' className='p-0'>Clear all</Button>                            
                            </Container>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>OS</Accordion.Header>
                        <Accordion.Body>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="radio" 
                                    label="Android"
                                    name='os'
                                    value="Android"
                                    onChange={handleChange}
                                    checked={props.searchFormDataState.os === "Android"}
                                />
                                <Form.Check 
                                    type="radio"
                                    label="iOS"
                                    name='os'
                                    value='iOS'
                                    onChange={handleChange}
                                    checked={props.searchFormDataState.os === "iOS"}
                                />
                                <Form.Check 
                                    type="radio"
                                    label="Other"
                                    name='os'
                                    value='Other'
                                    onChange={handleChange}
                                    checked={props.searchFormDataState.os === "Other"}
                                />
                            </Form.Group>
                            <Container className='d-flex justify-content-end'>
                                <Button onClick={osRestart} variant='link' className='p-0'>Clear all</Button>                            
                            </Container>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                        <Accordion.Header>Brand</Accordion.Header>
                        <Accordion.Body>
                                <Form.Select
                                aria-label="Default select example" 
                                
                                name="BrandId"
                                onChange={handleChange}
                                value={props.searchFormDataState.BrandId}>
                                        <option value="All">All</option>
                                        {props.brands.map(n => (
                                            <option key={n.id} value={n.id}>{n.name}</option>
                                        ))}
                                </Form.Select>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="6">
                        <Accordion.Header>Price</Accordion.Header>
                        <Accordion.Body className='d-flex'>
                            <Form.Group>
                                <Form.Label>
                                    From:
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name='from'
                                    min={0}
                                    value={props.searchFormDataState.price.from}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    To:
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name='to'
                                    min={props.searchFormDataState.price.from}
                                    value={props.searchFormDataState.price.to}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Button onClick={searchButton} style={styles} className='mt-3'>Refresh data</Button>
            </Container>
            </Container>
    )
}