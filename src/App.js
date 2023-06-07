import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Order from './pages/Order';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Product from './pages/Product';
import Home from './pages/Home';
import Cart from './pages/cart';
import Track from './pages/Track';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import Menu from './pages/Menu';
import Category from './pages/Category';

function App() {
  const menuData = [
    {
      id:1,
      category: 'Snacks',
      title: 'FIORI DI ZUCCA',
      price: '₹ 19.90',
      desc: 'Lorem ipsum dolor sit amet consectetur adi',
    },
    {
      id:2,
      category: 'Beverage',
      title: 'Coke',
      price: '₹ 19.90',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      id:3,
      category: 'Meal',
      title: 'Full Meal',
      price: '₹ 19.90',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      id:4,
      category: 'Snacks',
      title: 'Noodles',
      price: '₹ 45.90',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      id:5,
      category: 'Snacks',
      title: 'Chicken Momo',
      price: '₹ 65.90',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      id:6,
      category: 'Snacks',
      title: 'Chicken Momo',
      price: '₹ 65.90',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
  ];
  return (
    <>
      <BrowserRouter>
        <>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home data={menuData}/>} />
            <Route path='/order' element={<Track />} />
            <Route path='/order/:id' element={<Order />} />
            <Route path='/product/:id' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/menu' element={<Menu data={menuData}/>} />
            <Route path='/menu/:category' element={<Category data={menuData} />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/admin/dashboard' element={<Dashboard />} />
          </Routes>
          <Footer />
        </>
      </BrowserRouter>
    </>
  );
}

export default App;
