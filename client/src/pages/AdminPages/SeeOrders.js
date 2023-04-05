import axios from "axios";
import { useEffect, useState } from "react"
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/esm/Table";
import Alert from "react-bootstrap/Alert";
import useResponsive from "../../components/useResponsive";

export default function SeeOrders(){

    const [ordersState, setOrdersState] = useState([]);
    const {isMobile} = useResponsive();

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

    console.log(ordersState);
    return(
        <Container className={isMobile ? "w-100" : ""}>
            <h1>Orders</h1>
            {ordersState.length > 0 ?
              <div className={isMobile ? `w-50` : `w-100`} style={{overflowX: "auto"}}>
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
            {ordersState.map(n =>( 
                <tbody key={n.id} >
                <tr>
                  <td>{n.id}.</td>
                  <td>{n.shipping_address}</td>
                  <td>{n.payment_info}</td>
                  <td>{n.order_date}</td>
                  <td>{n.total_cost}</td>
                  <td>{n.order_status}</td>
                  <td><Button onClick={() => AcceptOrder(n.id)}>Accept</Button></td>
                  <td><Button onClick={() => CancelOrder(n.id)}>Cancel</Button></td>
                </tr>
              </tbody>
            ))}
            </Table> </div> : <Alert variant="info">0 orders left</Alert>}

        </Container>
    )
}