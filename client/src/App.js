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
import Profile from './pages/Profile';
import MyCart from './pages/MyCart';
import Setings from './pages/Setings';
import axios from 'axios';
import AdminMenu from './pages/AdminMenu';

function App() {
  const [authState, setAuthState] = useState({
    id: 0,
    username: "",
    RoleId:0
  })

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if(accessToken){

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
  }, []);

  return (
      <AuthContext.Provider value={{authState, setAuthState}}>
    <div className="App">
        <Router>
          <Navbars/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/models" element={<Models />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/cart' element={<MyCart />} />
            <Route path='/setings' element={<Setings />} />
            <Route path='/admin-menu' element={<AdminMenu />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Router>
    </div>
      </AuthContext.Provider>
  );
}

export default App;
