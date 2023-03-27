import Pagination from "react-bootstrap/Pagination";

export default function Paginate(props){
    
    const pageNumbers = [...Array(props.nPages+1).keys()].slice(1);
    const nextPage = () => {
        if(props.currentPage !== props.nPages) 
        props.setCurrentPage(props.currentPage + 1)
    }
    const prevPage = () => {
        if(props.currentPage !== 1) 
        props.setCurrentPage(props.currentPage - 1)
    }
    const lastPage = () => {
        props.setCurrentPage(props.nPages)
    }
    const firstPage = () => {
        props.setCurrentPage(props.nPages - pageNumbers.length + 1)
    }
    return(
            <Pagination>
                <Pagination.First onClick={firstPage} />
                <Pagination.Prev onClick={prevPage}  />
                {pageNumbers.map(n => (

                <Pagination.Item
                    key={n}
                    onClick={() => props.setCurrentPage(n)}
                    active={props.currentPage === n ? true: false}
                >{n}</Pagination.Item>
                ))}
                <Pagination.Next onClick={nextPage} />
                <Pagination.Last onClick={lastPage} />
            </Pagination>
    )
}