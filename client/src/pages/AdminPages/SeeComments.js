import axios from "axios";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import useResponsive from "../../components/useResponsive";
import Paginate from "../../components/Paginate";
import { useSearchParams } from "react-router-dom";

export default function SeeComments(){

    const {isMobile, isTablet} = useResponsive();
    const [searchParams, setSearchParams] = useSearchParams();
    const [comments, setComments] = useState([]);
    const [errorComment, setErrorComment] = useState([]);

    const page = searchParams.get("page");

    const [perPage] = useState(isTablet ? 9 : 6);
    const [currentPage, setCurrentPage] = useState(parseInt(page) ? parseInt(page) : 1);
    const indexOfLastRecord = currentPage * perPage;
    const indexOfFirstRecord = indexOfLastRecord - perPage;
    const nPages = Math.ceil(comments.length / perPage);

    const getComments = () => {
        axios.get("http://localhost:3001/comments", {
            headers:{
                'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(response => setComments(response.data))
        .catch(error => setErrorComment(error.response.data.errors))
    }
    useState(()=>{
        getComments();
    }, [comments])

    const replyComment = (email) => {
        window.location.href = `mailto:${email}`
    }

    const deleteComment  = (id) =>{
        axios.delete(`http://localhost:3001/delete-comment/${id}`, {
            headers:{
                'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(() => getComments())
        .catch(error => console.log(error))
    }

    let numErr = errorComment.length;

    const genNewSearcParam = (key, value) =>{
        const sp = new URLSearchParams(searchParams)
        if (value === null) {
            sp.delete(key)
        } else {
            sp.set(key, value)
        }

        return `?${sp.toString()}`
    }

    const refreshSearchParam = (n) => {
        setSearchParams(n);
    }

    const refreshPageNumber = (m) => {
        setCurrentPage(m)
    }

    return(
        <Container fluid className={isMobile ? "w-100 p-0 mt-2" : "w-100 p-0 m-0 mt-2"}>
        <h1>Comments</h1>
        {numErr <= 0 ?
        <Container fluid className={isMobile ? `w-100  p-0` : `w-100 m-0 p-0`} style={{overflowX: "auto"}}>
        <Table striped responsive={true} size={isMobile ? "sm" : ""}>
            <thead>
                <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th style={{width: "500px", padding:0, paddingBottom: 7}}>Comment</th>
                <th>Reply</th>
                <th>Delete</th>
                </tr>
            </thead>
            {comments
            .slice(indexOfFirstRecord, indexOfLastRecord)
            .map(n =>( 
                <tbody key={n.id} >
                <tr>
                  <td>{n.id}.</td>
                  <td>{n.name}</td>
                  <td>{n.email}</td>
                  <td style={{fontSize:"12px", height: "40px", padding: 0}}>
                        {n.comment.length >50 ? (
                            <Container style={{maxHeight:"32px",wordWrap: "break-word", overflowY:"auto",width: "500px", overflowX:"hidden", padding: 0}}>
                                {n.comment}
                            </Container>)
                            : 
                            (
                            <Container style={{padding: 0}}>
                                {n.comment}
                            </Container>
                        )}
                           
                    </td>
                  <td><Button onClick={() => replyComment(n.email)}>Reply</Button></td>
                  <td><Button onClick={() => deleteComment(n.id)}>Delete</Button></td>
                </tr>
              </tbody>
            ))}
            </Table> </Container> : <Alert variant="danger">{errorComment}</Alert>}

{comments.length > 0 && (
            <Container className="d-flex justify-content-center">
                <Paginate
                    nPages = { nPages }
                    currentPage = { currentPage } 
                    refreshPageNumber = { refreshPageNumber }
                    genNewSearcParam = {genNewSearcParam}
                    refreshSearchParam = {refreshSearchParam} />
            </Container>
)}
        </Container>
    )
}