import React , { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import '../styles/ProductPage.css';
import '../styles/Global.css';
import logo from '../assets/source/logo-all-dark.svg';
import banner from '../assets/source/photo-1512484457149-266d165a4eca.avif';
import banner2 from '../assets/source/lg-想吃甜點是不需要理由的.svg';

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/productions.json')
      .then(response => response.json())
      .then(data => setProducts(data.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="product-page">
      <header className="header">
      <img className="logo" src={logo} alt="Logo" />
        <div className="cart-icon">
          <FaShoppingCart size={24} />
        </div>
      </header>
      <div className="banner">
        <img className="banner" src={banner} alt="Banner" />
        <img className="banner2" src={banner2} alt="Banner2" />
      </div>

      <div className="content">
        <aside className="sidebar">
          <h3>甜點類別</h3>
          <ul>
            <li>所有甜點</li>
            <li>本日精選</li>
            <li>人氣推薦</li>
            <li>新品上市</li>
          </ul>
        </aside>
        <main className="product-list">
          {products.map((product, index) => (
            <div className="product-card" key={index}>
              <div className="product-image">
                <img src={product.cover} alt={product.image} />
              </div>
              <div className="product-info">
                <span className="product-name">{product.title}</span>
                <span className="product-price">NT$ {product.price}</span>
              </div>
              <button className="add-to-cart">放入購物車</button>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default ProductPage;
