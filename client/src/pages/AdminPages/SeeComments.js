import axios from "axios";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import useResponsive from "../../components/useResponsive";

export default function SeeComments(){

    const {isMobile} = useResponsive();

    const [comments, setComments] = useState([]);
    const [errorComment, setErrorComment] = useState([]);
    const [showMore, setShowMore] = useState(false);



    const [newComm, setNewComm] = useState();

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

    const showAllComment = (id, comment) => {
        let comLength = comment.length; 
        let oneRow = comLength / 50;
        console.log(oneRow);

        let newCom = "";
        let num = 0;

        for(let i = 0;i <= oneRow; i++){
            newCom += comment.substring(num, num+50) + "\n";
            num = num + 50;
            console.log(i);
        }

        setNewComm(newCom);
        setShowMore(true);
    }
    const showLess = () =>{
        setShowMore(false);
    }

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

    return(
        <Container className={isMobile ? "w-100" : ""}>
        <h1>Comments</h1>
        {numErr <= 0 ?
        <div className={isMobile ? `w-50` : `w-100`} style={{overflowX: "auto"}}>
        <Table striped responsive={true} size={isMobile ? "sm" : ""}>
            <thead>
                <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Comment</th>
                <th>Reply</th>
                <th>Delete</th>
                </tr>
            </thead>
            {comments.map(n =>( 
                <tbody key={n.id} >
                <tr>
                  <td>{n.id}.</td>
                  <td>{n.name}</td>
                  <td>{n.email}</td>
                  <td style={{fontSize:"12px"}}>
                        {n.comment.length >51 ? 
                            !showMore ?
                                <div className="d-flex  align-items-center"> {n.comment.substring(0,55)}
                                    <Button className="p-0 text-muted" variant="link" onClick={() => showAllComment(n.id, n.comment)}>...read more</Button>
                                </div> : <div>
                                            {newComm}
                                            <Button variant="link" style={{fontSize:"12px"}}  className="p-0 text-muted" onClick={showLess}>...show less</Button>
                                            </div> 
                                : n.comment}
                    </td>
                  <td><Button onClick={() => replyComment(n.email)}>Reply</Button></td>
                  <td><Button onClick={() => deleteComment(n.id)}>Delete</Button></td>
                </tr>
              </tbody>
            ))}
            </Table> </div> : <Alert variant="danger">{errorComment}</Alert>}
        </Container>
    )
}