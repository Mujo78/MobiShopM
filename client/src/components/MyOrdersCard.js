import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../helpers/AuthContext";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Paginate from "./Paginate";
import { toast } from "react-toastify";
import OrderModal from "./OrderModal";

export default function MyOrdersCard() {


    const [myOrders, setMyOrders] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    const handleShow = () => setModalShow(true);
    const handleClose = () => setModalShow(false);

    const {authState, infoPersonState} = useContext(AuthContext);

    const [perPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastRecord = currentPage * perPage;
    const indexOfFirstRecord = indexOfLastRecord - perPage;
    const nPages = Math.ceil(myOrders.length / perPage);

    const getData = () =>{

        if(authState.id !== 0){
            axios.get(`http://localhost:3001/order-items/${authState.id}`, {
                headers:{
                    'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
                  }
            })
            .then(response => setMyOrders(response.data))
            .catch(error => console.log(error))

        }
    }

    const cancelOrder = (id) => {

        axios.delete(`http://localhost:3001/delete-order-item/${id}`, {
            headers:{
                'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
              }
        })
        .then(() =>{
            getData();
            toast.success("Item successfully deleted!")
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getData();
    }, [authState.id])


    return(
        <>
            <h3>Orders</h3>
            <p style={{fontSize: "13px"}}>{myOrders.length} {myOrders.length > 0 ? "ITEMS" : "ITEM" }</p>

            <ListGroup>
                {myOrders && 
                    myOrders
                    .slice(indexOfFirstRecord, indexOfLastRecord)
                    .map(n => (
                        <ListGroup.Item key={n.id} className="mb-3 d-flex justify-content-between align-items-center" style={{border: "1px solid #219aeb", borderRadius: 0}}>
                            <div>
                                <h6 className="m-0">{n.mobile_name}</h6>
                                <p style={{fontSize: "13px", marginBottom: 10}}>ID {n.id}</p>
                                <Button className="m-0" style={{backgroundColor: "transparent", color: "#219aeb", border: "1px solid", borderRadius: 0}} onClick={handleShow}>See</Button>
                                {n.order_status === "Pending" && <Button onClick={() => cancelOrder(n.id)} style={{backgroundColor: "#219aeb", border: "none", borderRadius: 0}} className="ms-2">Cancel</Button>}
                            </div>
                            <div>
                                <Col>
                                {
                                    n.order_status === "Pending" ? 
                                        <p style={{}}><span style={{color: "#c0c0c0", fontSize: "22px"}}>•</span> {n.order_status} on {n.createdAt}</p> : 
                                        n.order_status === "Shipped" ? <p><span style={{color: "green", fontSize: "22px"}}>•</span> {n.order_status} on {n.updatedAt}</p> :
                                        <p><span style={{color: "red", fontSize: "22px"}}>•</span> {n.order_status} on {n.updatedAt}</p>
                                }
                                </Col>
                            </div>
                            <div>
                                <img src={n.photo} alt="img" style={{height: "100px"}} />
                            </div>

                            <OrderModal 
                                show={modalShow}
                                handleClose={handleClose}
                                data={n}
                                qnty={n.quantity}
                                dataPerson={infoPersonState}
                            />
                            
                        </ListGroup.Item>
    
                    ))
                }
            </ListGroup>

            <div className="d-flex align-items-end b-0">
            <Paginate 
                 nPages = { nPages }
                 currentPage = { currentPage } 
                 setCurrentPage = { setCurrentPage }/>
            </div>
        </>
    )
}