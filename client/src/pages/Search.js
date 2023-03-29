import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Cards from '../components/Card';
import Alert from "react-bootstrap/Alert";
import Offcanvas from "react-bootstrap/Offcanvas";
import useResponsive from '../components/useResponsive';
import Accordions from '../components/AccordionSearch';
import Button from 'react-bootstrap/esm/Button';
import Paginate from '../components/Paginate';
import axios from 'axios';

export default function Search(){

    const {isMobile, isTablet} = useResponsive();

    const [brands, setBrands] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [info, setInfo] = useState();
    const [stateFilter, setStateFilter] = useState(false);
    const [mobiles, setMobiles] = useState([])

    let num = isTablet ? 6 : 8;

    const [perPage] = useState(num);
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastRecord = currentPage * perPage;
    const indexOfFirstRecord = indexOfLastRecord - perPage;
    const nPages = Math.ceil(searchResult.length === 0 ? mobiles.length / perPage : searchResult.length / perPage);

    const [searchFormDataState, setSearchFormDataState] = useState({
        mobile_name: "",
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
        screen_size:"",
        battery:"",
        os:"",
        price:{
            from:"",
            to:""
        },
        BrandId:"All"
    })

    const getMobiteli =() => {
        axios.get("http://localhost:3001/mobiles")
        .then((response) => setMobiles(response.data));
    }

    useEffect(() =>{
        getMobiteli();
    }, [])
    

    const data = 
        searchResult
            .slice(indexOfFirstRecord, indexOfLastRecord)
            .map(n =>{
                return <Cards  key={n.id} mob={n}/>
    })

    const mobitels = 
        mobiles
            .slice(indexOfFirstRecord, indexOfLastRecord)
            .map(m => {
                return <Cards  key={m.id} mob={m}/>
    })
   
    const handleCloseFilter = () => setStateFilter(false);
    const handleShowFilter = () => setStateFilter(true);

    return(
        <>
        <div className='d-flex'>
            
            {isMobile ?
            <Button onClick={handleShowFilter} style={{marginTop: "10px",position: "fixed",borderRadius: "150px", backgroundColor: "#ffffff", color:"#219aeb", right:0}}>Filter</Button>
                :
             <Container className='w-25'>
            <Accordions 
                setBrands={setBrands}
                brands={brands}
                searchFormDataState={searchFormDataState}
                setInfo={setInfo}
                setSearchResult={setSearchResult}
                handleCloseFilter={handleCloseFilter}
                setSearchFormDataState={setSearchFormDataState}
            />
            </Container>
            }
            <div className='d-flex flex-column w-75'>
                <Container className='d-flex align-items-start justify-content-center flex-row mt-4'>
                    {(searchResult ?? []).length > 0 ? 
                        (info ?? []).length > 0 ?
                        <div className='d-flex flex-column'>
                            <Alert variant='secondary' className='d-flex justify-content-center align-items-center'>{info}</Alert> 
                            <div className='d-flex flex-wrap justify-content-center align-items-center'>{data}</div> 
                        </div>  
                        : <div className='d-flex flex-wrap justify-content-center align-items-center'>{data}</div> 
                    : <div className='d-flex flex-wrap justify-content-start align-items-center'> {mobitels} </div>}
                        
                </Container>
                <div className="d-flex mt-auto justify-content-center mt-2">
                <Paginate
                    nPages = { nPages }
                    currentPage = { currentPage } 
                    setCurrentPage = { setCurrentPage }/>
                </div>
            </div>
        </div>
        
        <Offcanvas show={stateFilter} onHide={handleCloseFilter} placement="end">
                <Offcanvas.Header closeButton>
                    Search filters
                </Offcanvas.Header>
            <Offcanvas.Body> 
                <Accordions 
                    setBrands={setBrands}
                    brands={brands}
                    searchFormDataState={searchFormDataState}
                    setInfo={setInfo}
                    handleShowFilter={handleShowFilter}
                    setSearchResult={setSearchResult}
                    handleCloseFilter={handleCloseFilter}
                    setSearchFormDataState={setSearchFormDataState}
                    />
             </Offcanvas.Body> </Offcanvas>
        </>
    )
}