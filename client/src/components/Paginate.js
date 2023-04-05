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
                <Pagination.First className="ms-2" onClick={firstPage} />
                <Pagination.Prev className="ms-2" onClick={prevPage}  />
                {pageNumbers.map(n => (

                <Pagination.Item className="ms-2" style={{backgroundColor: "#219aeb"}}
                    key={n}
                    onClick={() => props.setCurrentPage(n)}
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