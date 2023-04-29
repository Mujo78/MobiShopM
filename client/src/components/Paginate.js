import { useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";

import { Navigate, useLocation, useNavigate } from "react-router-dom";

export default function Paginate(props){

    
    const pageNumbers = [...Array(props.nPages+1).keys()].slice(1);
    const nextPage = () => {
        if(props.currentPage !== props.nPages) 
        props.refreshPageNumber(props.currentPage + 1)
    }
    const prevPage = () => {
        if(props.currentPage !== 1) 
        props.refreshPageNumber(props.currentPage - 1)
    }
    const lastPage = () => {
        props.refreshPageNumber(props.nPages)
    }
    const firstPage = () => {
        props.refreshPageNumber(props.nPages - pageNumbers.length + 1)
    }

    useEffect(() => {
        const newOne = props.genNewSearcParam("page", props.currentPage)
        props.refreshSearchParam(newOne)
    }, [props.currentPage])


    return(
            <Pagination>
                <Pagination.First className="ms-2" onClick={firstPage} />
                <Pagination.Prev className="ms-2" onClick={prevPage}  />
                {pageNumbers.map(n => (

                <Pagination.Item className="ms-2" style={{backgroundColor: "#219aeb"}}
                    key={n}
                    onClick={() => {
                        props.refreshPageNumber(n)
                        const newOne = props.genNewSearcParam("page", n)
                        props.refreshSearchParam(newOne)
                    }}
                    active={props.currentPage === n ? true: false}
                >
                    {n}
                </Pagination.Item>
                ))}
                <Pagination.Next className="ms-2" onClick={nextPage} />
                <Pagination.Last className="ms-2" onClick={lastPage} />
            </Pagination>
    )
}