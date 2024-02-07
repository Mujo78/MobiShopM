import axios from "axios";
import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/esm/ListGroup";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import { Image } from "../../components/Nav";
import useResponsive from "../../components/useResponsive";
import Container from "react-bootstrap/esm/Container";
import Paginate from "../../components/Paginate";
import { useAuth } from "../../context/AuthContext";
import Alert from "react-bootstrap/Alert";

export default function Wishlist() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");

  const [wishState, setWishState] = useState([]);
  const { user } = useAuth();
  const [quantity] = useState(1);
  const { isMobile, isTablet } = useResponsive();
  const [perPage] = useState(isTablet ? 5 : 4);
  const [currentPage, setCurrentPage] = useState(
    parseInt(page) ? parseInt(page) : 1
  );
  const indexOfLastRecord = currentPage * perPage;
  const indexOfFirstRecord = indexOfLastRecord - perPage;
  const nPages = Math.ceil(wishState.length / perPage);

  useEffect(() => {
    getWishItems();
  }, [user]);

  const getWishItems = () => {
    if (user.RoleId === 2 && user.id !== 0) {
      axios
        .get(`http://localhost:3001/wish-items`, {
          headers: {
            accessToken: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => setWishState(response.data))
        .catch((error) => toast.error(error));
    }
  };

  const deleteWishItem = (id) => {
    axios
      .delete(`http://localhost:3001/delete-wishitem/${id}`, {
        headers: {
          accessToken: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        getWishItems();
      })
      .catch((error) => console.log(error));
  };

  const addToCart = (id) => {
    axios
      .post(
        `http://localhost:3001/add-to-cart/${id}`,
        { quantity },
        {
          headers: {
            accessToken: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then(() => {
        deleteWishItem(id);
        toast.success("Item successfully added to cart!");
      })
      .catch((error) => toast.error(error.response.data));
  };

  const stylesone = {
    border: "none",
    borderRadius: 0,
    fontSize: "13px",
    backgroundColor: "#219aeb",
  };

  const stylestwo = {
    backgroundColor: "transparent",
    border: "none",
  };
  const nameOfClass = "d-flex align-items-center";

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
    <>
      <h3>Wishlist</h3>

      <ListGroup className="d-flex flex-wrap w-100 mb-3 flex-row">
        {wishState.slice(indexOfFirstRecord, indexOfLastRecord).map((m) => (
          <ListGroup.Item
            key={m.id}
            className={`${isTablet && `w-100`} ps-1 pe-1 me-2 mb-2`}
            style={{
              width: isTablet ? "" : "447px",
              border: "1px solid #C0C0C0",
              margin: "0px",
              borderRadius: 0,
            }}
          >
            <>
              <Row
                className={`d-flex align-items-center ${
                  isMobile && `text-center`
                }`}
              >
                <Col sm={3}>
                  <img
                    src={m.photo}
                    style={{ height: isMobile ? "120px" : "100px" }}
                    alt="img"
                  />
                </Col>
                <Col sm={5}>
                  <h6 className="m-0">{m.mobile_name}</h6>
                  <p style={{ fontSize: "13px" }} className="m-0 p-0">
                    {m.internal + "/" + m.ram + " GB"}
                  </p>
                  <p style={{ fontSize: "12px" }} className="m-0">
                    {m.processor}
                  </p>
                  <p style={{ color: "red" }} className="m-0">
                    {m.price + " KM "}
                  </p>
                </Col>
                {!isMobile ? (
                  <>
                    <Col sm={2} className={nameOfClass}>
                      <Button
                        onClick={() => addToCart(m.MobileId)}
                        className="p-2 mt-1"
                        style={stylesone}
                      >
                        Add To Cart
                      </Button>
                    </Col>
                    <Col sm={1} className={nameOfClass}>
                      <Button
                        onClick={() => deleteWishItem(m.MobileId)}
                        style={stylestwo}
                      >
                        <Image
                          src="/images/trash.png"
                          style={{ height: "20px" }}
                        />
                      </Button>
                    </Col>
                  </>
                ) : (
                  <>
                    <Row sm={2} className={nameOfClass}>
                      <Col style={{ flex: "1.40" }}>
                        <Button
                          className="w-100"
                          onClick={() => addToCart(m.MobileId)}
                          style={stylesone}
                        >
                          Add To Cart
                        </Button>
                      </Col>
                      <Col style={{ flex: "0.20" }}>
                        <Button
                          onClick={() => deleteWishItem(m.MobileId)}
                          style={stylestwo}
                        >
                          <Image
                            src="/images/trash.png"
                            style={{ height: "20px" }}
                          />
                        </Button>
                      </Col>
                    </Row>
                  </>
                )}
              </Row>
            </>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {wishState.length > 0 ? (
        <Container className="d-flex justify-content-center mb-3 mt-auto">
          <Paginate
            nPages={nPages}
            currentPage={currentPage}
            refreshPageNumber={refreshPageNumber}
            genNewSearcParam={genNewSearcParam}
            refreshSearchParam={refreshSearchParam}
          />
        </Container>
      ) : (
        <Alert variant="secondary" className="mt-5">
          Your wishlist is empty!
        </Alert>
      )}
    </>
  );
}
