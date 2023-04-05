import axios from "axios";
import { useEffect, useState } from "react"
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/esm/Table";
import Alert from "react-bootstrap/Alert";
import useResponsive from "../../components/useResponsive";
import Paginate from "../../components/Paginate";

export default function SeeOrders(){

    const [ordersState, setOrdersState] = useState([]);
    const {isMobile, isTablet} = useResponsive();
    const [perPage] = useState(isTablet ? 8 : 6);
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastRecord = currentPage * perPage;
    const indexOfFirstRecord = indexOfLastRecord - perPage;
    const nPages = Math.ceil(ordersState.length / perPage);

    useEffect(() =>{
        getOrders();
    }, [])

    const getOrders = () => {
        axios.get("http://localhost:3001/orders", {
            headers:{
                'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(response => setOrdersState(response.data))
        .catch(error => console.log(error))
    }

    const AcceptOrder = (id) => {
        
        axios.put(`http://localhost:3001/order/${id}`,{}, {
            headers:{
                'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(() => getOrders())
        .catch(error => console.log(error))
    }
    const CancelOrder = (id) => {
        axios.put(`http://localhost:3001/order-cancel/${id}`,{}, {
            headers:{
                'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(() => getOrders())
        .catch(error => console.log(error))
    }

    const style ={
        backgroundColor : "#219aeb",
        border: "none"
    }

    return(
        <Container className={isMobile ? "w-100 p-1" : "p-0"}>
            <h1>Orders</h1>
            {ordersState.length > 0 ?
              <Container className={isMobile ? `w-100 p-0 m-0` : `w-100 p-0`} style={{overflowX: "auto"}}>
            <Table striped responsive={true} size={isMobile ? "sm" : ""}>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Address</th>
                    <th>Payment</th>
                    <th>Date</th>
                    <th>Total cost</th>
                    <th>Status</th>
                </tr>
            </thead>
            {ordersState
            .slice(indexOfFirstRecord, indexOfLastRecord)
            .map(n =>( 
                <tbody key={n.id} >
                <tr>
                  <td>{n.id}.</td>
                  <td>{n.shipping_address}</td>
                  <td>{n.payment_info}</td>
                  <td>{n.order_date}</td>
                  <td>{n.total_cost}</td>
                  <td>{n.order_status}</td>
                  <td><Button onClick={() => AcceptOrder(n.id)} style={style}>Accept</Button></td>
                  <td><Button onClick={() => CancelOrder(n.id)} style={style}>Cancel</Button></td>
                </tr>
              </tbody>
            ))}
            </Table> </Container> : <Alert variant="info">0 orders left</Alert>}
            
            <Container className="d-flex justify-content-center">
            <Paginate
                nPages = { nPages }
                currentPage = { currentPage } 
                setCurrentPage = { setCurrentPage }/>
                </Container>
        </Container>
    )
}