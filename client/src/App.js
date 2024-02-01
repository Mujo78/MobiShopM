import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Navbars from "./components/Nav";
import Models from "./pages/Models";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import { useEffect, useState } from "react";
import { AuthContext } from "./helpers/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";
import MyCart from "./pages/ProfilePages/MyCart";
import Wishlist from "./pages/ProfilePages/Wishlist";
import axios from "axios";
import AdminMenu from "./pages/AdminMenu";
import Button from "react-bootstrap/esm/Button";
import Cart from "./components/Cart";
import AddAdmin from "./pages/AdminPages/AddAdmin";
import DeleteAdmin from "./pages/AdminPages/DeleteAdmin";
import AddMobile from "./pages/AdminPages/AddMobile";
import EditMobile from "./pages/AdminPages/EditMobile";
import DeleteMobile from "./pages/AdminPages/DeleteMobile";
import AddBrand from "./pages/AdminPages/AddBrand";
import SeeComments from "./pages/AdminPages/SeeComments";
import { ToastContainer } from "react-toastify";
import Overview from "./pages/ProfilePages/Overview";
import SeeOrders from "./pages/AdminPages/SeeOrders";
import Orders from "./pages/ProfilePages/Orders";
import Info from "./pages/ProfilePages/Info";
import ProfileData from "./pages/ProfilePages/ProfileData";
import ChangePassword from "./pages/ProfilePages/ChangePassword";
import EditProfile from "./pages/ProfilePages/EditProfile";
import AuthRequired from "./helpers/AuthRequired";
import AdminAuthRequired from "./helpers/AdminAuthRequired";
import UserRequired from "./helpers/UserRequired";
import { BsCart2 } from "react-icons/bs";

function App() {
  const [showCart, setShowCart] = useState(false);
  const [errorCarts, setCartsErrors] = useState([]);
  const [cartItemsInfo, setCartItemsInfo] = useState([]);
  const [infoPersonState, setInfoPersonState] = useState([]);

  const [authState, setAuthState] = useState({
    id: 0,
    username: "",
    RoleId: 0,
  });
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken !== null) {
      axios
        .get("http://localhost:3001/user", {
          headers: {
            accessToken: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setAuthState({
            id: response.data.id,
            username: response.data.username,
            RoleId: response.data.RoleId,
          });
        })
        .catch((error) => {
          return <Home />;
        });
    }
    if (authState.id !== 0) {
      getPersonInfo(authState.id);
    }
  }, [authState.id]);

  const getPersonInfo = (id) => {
    axios
      .get(`http://localhost:3001/person/${id}`)
      .then((response) => setInfoPersonState(response.data))
      .catch((error) => console.log(error));
  };

  function handleShowCart(id) {
    getCartItemsInfo(id);
    setShowCart(true);
  }
  function handleCloseCart() {
    getCartItemsInfo(authState.id);
    setShowCart(false);
  }

  const getCartItemsInfo = (id) => {
    if (id !== 0) {
      axios
        .get(`http://localhost:3001/cart/${id}`, {
          headers: {
            accessToken: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => setCartItemsInfo(response.data))
        .catch((error) => setCartsErrors(error));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState,
        infoPersonState,
        setInfoPersonState,
        cartItemsInfo,
        setCartItemsInfo,
      }}
    >
      <div className="App">
        <Router>
          <ToastContainer />
          <Navbars />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="models/:brandName?" element={<Models />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />

            {authState.id !== 0 && (
              <Route element={<AuthRequired />}>
                <Route path="profile" element={<Profile />}>
                  <Route index element={<Overview />} />
                  <Route path="edit-profile" element={<EditProfile />}>
                    <Route index element={<Info />} />
                    <Route path="profile-data" element={<ProfileData />} />
                    <Route
                      path="change-password"
                      element={<ChangePassword />}
                    />
                  </Route>
                  <Route element={<UserRequired />}>
                    <Route path="my-cart" element={<MyCart />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="wishlist" element={<Wishlist />} />
                  </Route>
                </Route>
              </Route>
            )}
            <Route path="*" element={<PageNotFound />} />

            {authState.id !== 0 && (
              <Route element={<AdminAuthRequired />}>
                <Route path="admin-menu" element={<AdminMenu />}>
                  <Route path="add-admin" element={<AddAdmin />} />
                  <Route path="delete-admin" element={<DeleteAdmin />} />
                  <Route path="add-mobile" element={<AddMobile />} />
                  <Route path="edit-mobile" element={<EditMobile />} />
                  <Route path="delete-mobile" element={<DeleteMobile />} />
                  <Route path="add-brand" element={<AddBrand />} />
                  <Route path="see-comments" element={<SeeComments />} />
                  <Route path="orders" element={<SeeOrders />} />
                </Route>
              </Route>
            )}
          </Routes>
          {authState.RoleId !== 1 && (
            <Button
              onClick={() => handleShowCart(authState.id)}
              className="position-fixed mb-5 ms-5 p-4 rounded-pill bg-transparent bottom-0"
              style={{
                left: 0,
                border: "5px solid #219AEB",
              }}
            >
              <BsCart2
                className=" text-dark"
                style={{ height: "30px", width: "30px" }}
              />
            </Button>
          )}
        </Router>
        <Cart
          show={showCart}
          onHide={handleCloseCart}
          personData={infoPersonState}
          refreshData={() => getCartItemsInfo(authState.id)}
          err={errorCarts}
        />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
