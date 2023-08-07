import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from 'components/Navbar';
import Home from 'pages/Home';
import Shop from 'pages/Shop';
import Product from 'pages/Product';
import Cart from 'pages/Cart';
import Signin from 'pages/Signin';
import Signup from 'pages/Signup';
import Search from 'pages/Search';
import Order from 'pages/Order';
import Payment from 'pages/Payment';
import Account from 'pages/Account';
import Page404 from 'pages/Page404';


const RouteContainer = () => {
  const qs = require('querystring')
  const pageNumber = qs.parse(window.location.search.replace('?', '')).page
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/shop' element={<Home />} />
        <Route path='/shop/:category' element={<Shop page={1} />} />
        <Route path='/shop/:category/:page' element={<Shop page={pageNumber} />} />
        <Route path='/product/:slug' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/search/:slug' element={<Search />} />
        <Route path='/order' element={<Order />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/account' element={<Account />} />
        <Route path='/account/:slug' element={<Account />} />
        <Route path='/*' element={<Page404 />} />
      </Routes>
    </Router>
  );
};

export default RouteContainer;
