import './App.css';

import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import Search from './pages/Search';
import Navbars, { Image } from './components/Nav';
import Models from './pages/Models';
import About from './pages/About';
import Contact from './pages/Contact';
import PageNotFound from './pages/PageNotFound';
import { useEffect, useState } from 'react';
import { AuthContext } from './helpers/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './pages/Profile';
import MyCart from './pages/MyCart';
import Wishlist from './pages/Wishlist';
import axios from 'axios';
import AdminMenu from './pages/AdminMenu';
import Button from 'react-bootstrap/esm/Button';
import Cart from './components/Cart';
import AddAdmin from './pages/AddAdmin';
import DeleteAdmin from './pages/DeleteAdmin';
import AddMobile from './pages/AddMobile';
import EditMobile from './pages/EditMobile';
import DeleteMobile from './pages/DeleteMobile';
import AddBrand from './pages/AddBrand';
import SeeComments from './pages/SeeComments';
import { ToastContainer } from 'react-toastify';
import Overview from './pages/Overview';
import SeeOrders from './pages/SeeOrders';
import Orders from './pages/Orders';
import Info from './pages/Info';
import ProfileData from './pages/ProfileData';
import ChangePassword from './pages/ChangePassword';
import EditProfile from './pages/EditProfile';

function App() {
  const [authState, setAuthState] = useState({
    id: 0,
    username: "",
    RoleId:0
  })

  const [showCart, setShowCart] = useState(false);
  const [errorCarts, setCartsErrors] = useState([]);
  const [cartItemsInfo, setCartItemsInfo] = useState([]);
  const [infoPersonState, setInfoPersonState] = useState([]);


  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if(accessToken !== null){

    axios.get("http://localhost:3001/user", {
        headers: {
          'accessToken': `Bearer ${accessToken}`
        }
      }).then(response => {
        let user = response.data;
        setAuthState({
          id: user.id,
          username: user.username,
          RoleId: user.RoleId
        })
      }).catch(error =>{
        return <Home />
      })

    }
    if(authState.id !== 0){
      getPersonInfo(authState.id);
    } 
  }, [accessToken, authState.id]);

  const getPersonInfo = (id) => {
    axios.get(`http://localhost:3001/person/${id}`)
      .then(response => setInfoPersonState(response.data))
      .catch(error => console.log(error))
  }

  function handleShowCart(id){
    getCartItemsInfo(id);
    setShowCart(true);

  }
  function handleCloseCart(){
    getCartItemsInfo(authState.id);
    setShowCart(false);
  }

  const getCartItemsInfo = (id) => {
    if(id !== 0){
      axios.get(`http://localhost:3001/cart/${id}`, {
        headers: {
          'accessToken': `Bearer ${accessToken}`
        }
      })
      .then(response => setCartItemsInfo(response.data))
      .catch(error => setCartsErrors(error))
    }
  }

  return (
      <AuthContext.Provider value={{authState, setAuthState, infoPersonState, setInfoPersonState, cartItemsInfo,setCartItemsInfo}}>
    <div className="App">
        <Router>
          <ToastContainer />
          <Navbars/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="models/:brandName?" element={<Models />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            
              <Route path='profile' element={<Profile />}>
                <Route index element={<Overview />}/>
                <Route path='edit-profile' element={<EditProfile />}>
                  <Route index element={<Info />} />
                  <Route path='profile-data' element={<ProfileData />} />
                  <Route path='change-password' element={<ChangePassword />} />
                </Route>
                <Route path='my-cart' element={<MyCart />} />
                <Route path='orders' element={<Orders />} />
                <Route path='wishlist' element={<Wishlist />} />
              </Route>
            <Route path='*' element={<PageNotFound />} />

              <Route path='admin-menu' element={<AdminMenu />}>
                <Route path='add-admin' element={<AddAdmin />} />
                <Route path='delete-admin' element={<DeleteAdmin />} />
                <Route path='add-mobile' element={<AddMobile />} />
                <Route path='edit-mobile' element={<EditMobile />} />
                <Route path='delete-mobile' element={<DeleteMobile />} />
                <Route path='add-brand' element={<AddBrand />} />
                <Route path='see-comments' element={<SeeComments />} />
                <Route path='orders' element={<SeeOrders />} />
              </Route>
          </Routes>
        {authState.RoleId !== 1 && <Button onClick={() => handleShowCart(authState.id)} className="position-fixed bottom-0 mb-5 rounded-pill" style={{backgroundColor:"transparent", border:"5px solid #219AEB"}}>  <Image src="/images/cart.png" alt="cart" style={{height: "60px", padding: "10px"}} />
          </Button>}
        </Router>
          <Cart show={showCart} onHide={handleCloseCart} personData={infoPersonState} refreshData={()=> getCartItemsInfo(authState.id)} err={errorCarts} />
    </div>
      </AuthContext.Provider>
  );
}

export default App;
