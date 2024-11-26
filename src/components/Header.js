import React from 'react';
import '../styles/Header.css';
import headerlogo from '../assets/source/logo-all-dark.svg';
import { FaShoppingCart } from 'react-icons/fa';

const Header = ({ cartItems, cartCount, showCart, setShowCart }) => {
  return (
    <>
      <header className="header d-flex justify-content-between align-items-center py-3 px-4">
        <img
          className="headerlogo"
          src={headerlogo}
          alt="Logo"
          onClick={() => setShowCart(false)}
        />
        <div
          className="cart-icon position-relative"
          onClick={() => setShowCart(true)}
        >
          <FaShoppingCart size={24} />

          <span className="cart-count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cartCount}
          </span>
        </div>
      </header>
    </>
  );
};

export default Header;
