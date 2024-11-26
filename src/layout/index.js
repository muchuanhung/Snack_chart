import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = useSelector((state) => state.cart.totalQuantity);
  const [showCart, setShowCart] = useState(false);

  return (
    <div>
      {/* Navbar */}
      <Header
        cartItems={cartItems}
        cartCount={cartCount}
        showCart={showCart}
        setShowCart={setShowCart}
      />
      <main>{children(showCart, setShowCart)}</main>
      <Footer />
    </div>
  );
};

export default Layout;
