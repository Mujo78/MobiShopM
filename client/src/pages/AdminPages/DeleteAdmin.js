import axios from "axios"
import { useEffect, useState } from "react"
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import useResponsive from "../../components/useResponsive";
import { Image } from "../../components/Nav";
import Container from "react-bootstrap/esm/Container";


export default function DeleteAdmin(){
    const [adminData, setAdminsData] = useState([]);
    const [errors, setErrors] = useState([]);
    const {isMobile} = useResponsive();

    useEffect(()=> {
        getAdmins();
    }, [])

    const getAdmins = () => {
        axios.get("http://localhost:3001/all-admins", {
            headers:{
                'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(response=>{
            setAdminsData(response.data);
        }).catch(error => {
            setErrors(error.response.data);
        })
    }
    let num = errors.length;

    const deleteAdmin = (id, fName, lName) => {
        let username = fName + "." + lName;
        let answer = window.confirm(`Are you sure you want to delete: ${username}?`);
 

        if(answer){

            axios.delete(`http://localhost:3001/delete/${id}`,{
                headers:{
                    'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            .then(setAdminsData(adminData.filter(m => m.id !== id )))
            .catch(error=>{
                setErrors(error);
            })
        }
    }

    return(
        <>
        <h1>Delete Admin</h1>
        <Container className="d-flex flex-wrap justify-content-center mt-4">
               {num <= 0 ?
                    adminData.map(n => ( <Card key={n.id} className={isMobile ? "w-100" : "me-2"}>
                    <Card.Body className={`d-flex ${isMobile ? `justify-content-center` : ""}  align-items-center flex-wrap`}>
                        <Card.Title className="me-2 mt-2">{n.first_name} {n.last_name}</Card.Title>
                        <Button onClick={() => deleteAdmin(n.id, n.first_name, n.last_name)} className="p-0" style={{backgroundColor: "transparent", border: "none"}}>
                            <Image src="/images/trash.png" style={{height: "20px"}} />
                            </Button>
                    </Card.Body>
                </Card>)) : <Alert variant="danger">{errors < 0 ? "Nothing to delete" : errors}</Alert>
                }
            
        </Container>
        </>

    )
}