import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/esm/Table";
import Alert from "react-bootstrap/Alert";
import useResponsive from "../../components/useResponsive";
import Paginate from "../../components/UI/Paginate";
import { useSearchParams } from "react-router-dom";
import { apiClientAuth } from "../../helpers/ApiClient";

export default function SeeOrders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");

  const [ordersState, setOrdersState] = useState([]);
  const { isMobile, isTablet } = useResponsive();
  const [perPage] = useState(isTablet ? 8 : 6);
  const [currentPage, setCurrentPage] = useState(
    parseInt(page) ? parseInt(page) : 1
  );
  const indexOfLastRecord = currentPage * perPage;
  const indexOfFirstRecord = indexOfLastRecord - perPage;
  const nPages = Math.ceil(ordersState.length / perPage);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    apiClientAuth
      .get("/order/")
      .then((response) => setOrdersState(response.data))
      .catch((error) => console.log(error));
  };

  const AcceptOrder = (id) => {
    apiClientAuth
      .patch(`/order/${id}`, {})
      .then(() => getOrders())
      .catch((error) => console.log(error));
  };
  const CancelOrder = (id) => {
    apiClientAuth
      .put(`/order/${id}`, {})
      .then(() => getOrders())
      .catch((error) => console.log(error));
  };

  const style = {
    backgroundColor: "#219aeb",
    border: "none",
  };

  const genNewSearcParam = (key, value) => {
    const sp = new URLSearchParams(searchParams);
    if (value === null) {
      sp.delete(key);
    } else {
      sp.set(key, value);
    }

    return `?${sp.toString()}`;
  };

  const refreshSearchParam = (n) => {
    setSearchParams(n);
  };

  const refreshPageNumber = (m) => {
    setCurrentPage(m);
  };

  return (
    <Container className={isMobile ? "w-100 p-1" : "p-0"}>
      <h1>Orders</h1>
      {ordersState.length > 0 ? (
        <Container
          className={isMobile ? `w-100 p-0 m-0` : `w-100 p-0`}
          style={{ overflowX: "auto" }}
        >
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
              .map((n) => (
                <tbody key={n.id}>
                  <tr>
                    <td>{n.id}.</td>
                    <td>{n.shipping_address}</td>
                    <td>{n.payment_info}</td>
                    <td>{n.order_date}</td>
                    <td>{n.total_cost}</td>
                    <td>{n.order_status}</td>
                    <td>
                      <Button onClick={() => AcceptOrder(n.id)} style={style}>
                        Accept
                      </Button>
                    </td>
                    <td>
                      <Button onClick={() => CancelOrder(n.id)} style={style}>
                        Cancel
                      </Button>
                    </td>
                  </tr>
                </tbody>
              ))}
          </Table>{" "}
        </Container>
      ) : (
        <Alert variant="info">0 orders left</Alert>
      )}

      {ordersState.length > 0 && (
        <Container className="d-flex justify-content-center">
          <Paginate
            nPages={nPages}
            currentPage={currentPage}
            refreshPageNumber={refreshPageNumber}
            genNewSearcParam={genNewSearcParam}
            refreshSearchParam={refreshSearchParam}
          />
        </Container>
      )}
    </Container>
  );
}
