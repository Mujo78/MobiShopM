import { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Cards from '../components/Card';
import Alert from "react-bootstrap/Alert";
import Offcanvas from "react-bootstrap/Offcanvas";
import useResponsive from '../components/useResponsive';
import Accordions from '../components/AccordionSearch';

export default function Search(){

    const {isMobile, isTablet} = useResponsive();

    const [brands, setBrands] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [info, setInfo] = useState();
    const [stateFilter, setStateFilter] = useState(false);
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

    

    const data = searchResult.map(n =>{
        return <Cards  key={n.id} mob={n}/>
    })

    const mobitels = mobiteli.map(m => {
        return <Cards  key={m.id} mob={m}/>
    })
   


    const handleCloseFilter = () => setStateFilter(false);
    const handleShowFilter = () => setStateFilter(true);


    console.log(searchFormDataState);
    return(
        <>
        <div className='d-flex'>
            
            {isMobile ?
            <Offcanvas show={stateFilter} onHide={handleCloseFilter} placement="end">
                <Offcanvas.Header closeButton>
                    Search filters
                </Offcanvas.Header>
            <Offcanvas.Body> 
                <Accordions 
                    setBrands={setBrands}
                    brands={brands}
                    setMobiteli={setMobiteli} 
                    searchFormDataState={searchFormDataState}
                    setInfo={setInfo}
                    handleShowFilter={handleShowFilter}
                    setSearchResult={setSearchResult}
                    handleCloseFilter={handleCloseFilter}
                    setSearchFormDataState={setSearchFormDataState}
                    />
             </Offcanvas.Body> </Offcanvas> :
             <Container>
            <Accordions 
            setBrands={setBrands}
            brands={brands}
            setMobiteli={setMobiteli} 
            searchFormDataState={searchFormDataState}
            setInfo={setInfo}
            setSearchResult={setSearchResult}
            handleCloseFilter={handleCloseFilter}
            setSearchFormDataState={setSearchFormDataState}
            />
            </Container>
            }
            <Container className='d-flex flex-row'>
                {(searchResult ?? []).length > 0 ? 
                    (info ?? []).length > 0 ? <Alert variant='secondary' className='d-flex justify-content-center align-items-center'>{info}</Alert> : <div className='d-flex flex-wrap align-items-center'>{data}</div> 
                    : <div className='d-flex flex-wrap justify-content-center align-items-center'> {mobitels} </div>}
            </Container>
        </div>
        </>
    )
}