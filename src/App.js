import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import Order from './pages/Order';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Product from './pages/Product';
import Home from './pages/Home';
import Track from './pages/Track';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import Menu from './pages/Menu';
import Category from './pages/Category';
import { API, Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';
import Contact from './pages/Contact';
import Cart from './pages/cart';

function App() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setIsLogin(true);
    } catch (error) {
      setIsLogin(false);
      console.log(error);
    }
  };

  const apiName = 'foodAppApi';
  const path = '/client/products';

  const fetchData = async () => {
    try {
      const response = await API.get(apiName, path);
      setData(response);
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {

    fetchData();
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUser(true);
      } catch (error) {
        setUser(null);
      }
    };

    checkUser();
  }, []);

  return (
    <>
      <BrowserRouter>
        <>
          <Navbar user={user} />
          <Routes>
            <Route path='/' element={<Home data={data} />} />
            <Route path='/order' element={<Track />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/order/:id' element={<Order />} />
            <Route path='/product/:id' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/menu' element={<Menu data={data} fetch={fetchData}/>} />
            <Route path='/menu/:category' element={<Category data={data} fetch={fetchData}/>} />
            {isLogin ? (
              <>
              <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </>
        ) : (
          <>
            <Route path="/admin/dashboard" element={<Navigate to="/admin" />} />
            <Route path="/admin" element={<Admin />} />
          </>
        )}
          </Routes>
          <Footer />
        </>
      </BrowserRouter>
    </>
  );
}

export default App;
