import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import Form from 'react-bootstrap/Form';
import Accordion from "react-bootstrap/Accordion";
import axios from 'axios';
import Cards from '../components/Card';
import Alert from "react-bootstrap/Alert";

export default function Search(){

    const [brands, setBrands] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [info, setInfo] = useState();
    const [mobiteli, setMobiteli] = useState([])

    const [searchFormDataState, setSearchFormDataState] = useState({
        naziv: "",
        ram:{
            ram16: false,
            ram12: false,
            ram8: false,
            ram6: false,
            ram4: false
        },
        internal:{
            internal512: false,
            internal256: false,
            internal128: false,
            internal64: false,
            internal32: false,
            internal16: false,
            internal8: false,
            internal4: false
        },
        velicinaEkrana:"",
        baterija:"",
        os:"",
        cijena:{
            from:"",
            to:""
        },
        BrandId:"All"

    })
    
    useEffect(() =>{
        getBrands();
        getMobiteli();
    }, [])
    
    const getBrands = () =>{
        axios.get("http://localhost:3001/brands")
        .then(response => setBrands(response.data))
        .catch(error => console.log(error))
    }
    const getMobiteli =() => {
        axios.get("http://localhost:3001/mobiteli")
        .then((response) => setMobiteli(response.data));
    }

    const searchButton = () => {
        axios.post("http://localhost:3001/search", searchFormDataState)
        .then(response => {
            setSearchResult(response.data)
            setSearchFormDataState({naziv: "",ram:{ram16: false,ram12: false,ram8: false,ram6: false,ram4: false},
                                    velicinaEkrana:"",baterija:"",
                                    internal:{internal512: false,internal256: false,internal128: false,internal64: false,
                                            internal32: false,internal16: false,internal8: false, internal4: false},
                                    os:"",cijena:{from:"",to:""},BrandId:"All"})}
        )
        .catch(error => setInfo(error.response.data))
    }

    const handleChange = (event) =>{
        const {name,type, value,checked} = event.target;
        type === "checkbox"? 
            name.startsWith("ram") ? setSearchFormDataState(n => ({...n,
                ram:{...n.ram, [name]:checked}})) : setSearchFormDataState(n => ({...n,
                                                    internal:{...n.internal, [name]:checked}}))
                    : 
            setSearchFormDataState(n => ({...n,
                cijena:{...n.cijena, [name]: value=== "" ? parseInt(0) : parseInt(value)},
                [name]: type=== "range" ? 
                                value === "" ? value.toString() : parseInt(value)
                            : value}))
    }

    const data = searchResult.map(n =>{
        return <Cards  key={n.id} mob={n}/>
    })

    const mobitels = mobiteli.map(m => {
        return <Cards  key={m.id} mob={m}/>
    })
    console.log(info);

    return(
        <>
        <FormGroup className='d-flex w-75 ms-auto me-auto mb-4 mt-4 justify-content-center align-items-center'>
            <Form.Control
                type="text"
                name="naziv"
                onChange={handleChange}
                value={searchFormDataState.naziv}
                placeholder="Samsung Galaxy S23 Ultra 5G"
            />
            <Button onClick={searchButton} style={{backgroundColor:"#219aeb"}}>Search</Button>
        </FormGroup>
        <div className='d-flex'>
            <Container className='w-25'>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>RAM</Accordion.Header>
                        <Accordion.Body>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="checkbox" 
                                    label="16 GB"
                                    name='ram16'
                                    onChange={handleChange}
                                    checked={searchFormDataState.ram.ram16}
                                    value={searchFormDataState.ram.ram16}
                                    />
                                <Form.Check 
                                    type="checkbox"
                                    label="12 GB"
                                    name='ram12'
                                    onChange={handleChange}
                                    checked={searchFormDataState.ram.ram12}
                                    />
                                <Form.Check 
                                    type="checkbox"
                                    label="8 GB"
                                    name='ram8'
                                    onChange={handleChange}
                                    checked={searchFormDataState.ram.ram8}
                                    />
                                <Form.Check 
                                    type="checkbox"
                                    label="6 GB"
                                    name='ram6'
                                    onChange={handleChange}
                                    checked={searchFormDataState.ram.ram6}
                                    />
                                <Form.Check 
                                    type="checkbox" 
                                    label="4 GB"
                                    name='ram4'
                                    onChange={handleChange}
                                    checked={searchFormDataState.ram.ram4}
                                    />
                            </Form.Group>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Memory</Accordion.Header>
                        <Accordion.Body>
                        <Form.Group className="mb-3">
                                <Form.Check
                                    type="checkbox" 
                                    label="512 GB"
                                    name='internal512'
                                    onChange={handleChange}
                                    checked={searchFormDataState.internal.internal512}

                                    />
                                <Form.Check 
                                    type="checkbox"
                                    label="256 GB"
                                    name='internal256'
                                    onChange={handleChange}
                                    checked={searchFormDataState.internal.internal256}
                                    />
                                <Form.Check 
                                    type="checkbox"
                                    label="128 GB"
                                    name='internal128'
                                    onChange={handleChange}
                                    checked={searchFormDataState.internal.internal128}
                                    />
                                <Form.Check 
                                    type="checkbox"
                                    label="64 GB"
                                    name='internal64'
                                    onChange={handleChange}
                                    checked={searchFormDataState.internal.internal64}
                                    />
                                <Form.Check 
                                    type="checkbox" 
                                    label="32 GB"
                                    name='internal32'
                                    onChange={handleChange}
                                    checked={searchFormDataState.internal.internal32}
                                    />
                                <Form.Check 
                                    type="checkbox" 
                                    label="16 GB"
                                    name='internal16'
                                    onChange={handleChange}
                                    checked={searchFormDataState.internal.internal16}
                                    />
                                    <Form.Check 
                                    type="checkbox" 
                                    label="8 GB"
                                    name='internal8'
                                    onChange={handleChange}
                                    checked={searchFormDataState.internal.internal8}
                                    />
                                    <Form.Check 
                                    type="checkbox" 
                                    label="4 GB"
                                    name='internal4'
                                    onChange={handleChange}
                                    checked={searchFormDataState.internal.internal4}
                                    />
                            </Form.Group>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Screen size</Accordion.Header>
                        <Accordion.Body className='text-center'>
                            <Form.Label style={{fontSize:"15px"}} >{searchFormDataState.velicinaEkrana}"</Form.Label>
                            <Form.Range
                                type="range"
                                min={1.0}
                                max={8.0}
                                step={0.1}
                                value={searchFormDataState.velicinaEkrana}
                                name="velicinaEkrana"
                                onChange={handleChange}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Battery</Accordion.Header>
                        <Accordion.Body className='text-center'>
                            <Form.Label style={{fontSize:"15px"}} >{searchFormDataState.baterija} mAh</Form.Label>
                            <Form.Range
                                type="range"
                                min={3000}
                                max={6000}
                                step={1}
                                value={searchFormDataState.baterija}
                                name="baterija"
                                onChange={handleChange}
                            />
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
                                    checked={searchFormDataState.os === "Android"}
                                />
                                <Form.Check 
                                    type="radio"
                                    label="iOS"
                                    name='os'
                                    value='iOS'
                                    onChange={handleChange}
                                    checked={searchFormDataState.os === "iOS"}
                                />
                                <Form.Check 
                                    type="radio"
                                    label="Other"
                                    name='os'
                                    value='Other'
                                    onChange={handleChange}
                                    checked={searchFormDataState.os === "Other"}
                                />
                            </Form.Group>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                        <Accordion.Header>Brand</Accordion.Header>
                        <Accordion.Body>
                                <Form.Select
                                aria-label="Default select example" 
                                
                                name="BrandId"
                                onChange={handleChange}
                                value={searchFormDataState.BrandId}>
                                        <option value="All">All</option>
                                        {brands.map(n => (
                                            <option key={n.id} value={n.id}>{n.ime}</option>
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
                                    value={searchFormDataState.cijena.from}
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
                                    min={searchFormDataState.cijena.from}
                                    value={searchFormDataState.cijena.to}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Button onClick={searchButton} className='mt-3'>Refresh data</Button>
            </Container>
            <Container className='d-flex flex-wrap'>
                {searchResult.length > 0 ? info.length > 0 ? 
                
                        <Alert variant='secondary'>{info}</Alert> : 
                            <div>
                        {data} </div> : <div> {mobitels} </div>}
            </Container>
        </div>
        </>
    )
}