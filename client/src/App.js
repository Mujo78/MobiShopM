import './App.css';

import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import Search from './pages/Search';
import Navbars from './components/Nav';
import Models from './pages/Models';
import About from './pages/About';
import Contact from './pages/Contact';
import PageNotFound from './pages/PageNotFound';
import { useEffect, useState } from 'react';
import { AuthContext } from './helpers/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './pages/Profile';
import MyCart from './pages/MyCart';
import Setings from './pages/Setings';
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
      <AuthContext.Provider value={{authState, setAuthState}}>
    <div className="App">
        <Router>
          <ToastContainer />
          <Navbars/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/models/:brandName?" element={<Models />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
              <Route path='/profile' element={<Profile />}>
                <Route path='/profile/my-cart' element={<MyCart />} />
                <Route path='/profile/setings' element={<Setings />} />
                <Route path='/profile/overview' element={<Overview />} />
              </Route>
            <Route path='*' element={<PageNotFound />} />

              <Route path='/admin-menu' element={<AdminMenu />}>
                <Route path='/admin-menu/add-admin' element={<AddAdmin />} />
                <Route path='/admin-menu/delete-admin' element={<DeleteAdmin />} />
                <Route path='/admin-menu/add-mobile' element={<AddMobile />} />
                <Route path='/admin-menu/edit-mobile' element={<EditMobile />} />
                <Route path='/admin-menu/delete-mobile' element={<DeleteMobile />} />
                <Route path='/admin-menu/add-brand' element={<AddBrand />} />
                <Route path='/admin-menu/see-comments' element={<SeeComments />} />
                <Route path='/admin-menu/orders' element={<SeeOrders />} />
              </Route>
          </Routes>
        {authState.RoleId !== 1 && <Button onClick={() => handleShowCart(authState.id)} className="position-fixed bottom-0 mb-5 rounded-pill" style={{backgroundColor:"transparent", border:"5px solid #219AEB"}}>  <img src="../images/cart.png" alt="cart" />
          </Button>}
        </Router>
          <Cart show={showCart} onHide={handleCloseCart} personData={infoPersonState} refreshData={()=> getCartItemsInfo(authState.id)} items={cartItemsInfo} err={errorCarts} />
    </div>
      </AuthContext.Provider>
  );
}

export default App;
