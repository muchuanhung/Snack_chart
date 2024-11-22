import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updateQuantity, removeItem } from '../features/cartSlice';
import Cart from '../components/Cart';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Product from '../components/Product';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import '../styles/ProductPage.css';
import '../styles/Global.css';

const ProductPage = () => {
  const [activeCategory, setActiveCategory] = useState('所有甜點');
  const categories = [
    { name: '所有甜點', count: 48 },
    { name: '本日精選', count: 10 },
    { name: '人氣推薦', count: 26 },
    { name: '新品上市', count: 12 },
  ];
  const [products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/api/productions.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setProducts(data.data))
      .catch((error) => {
        console.error('Error fetching products:', error);
        alert('無法加載產品資料，請稍後再試。');
      });
  }, []);

  return (
    <>
      {/* Navbar */}
      <Header
        cartItems={cartItems}
        cartCount={cartCount}
        showCart={showCart}
        setShowCart={setShowCart}
      />
      {/* Banner */}
      <Banner />
      {/* Body */}
      <div className="content d-flex flex-column flex-md-row justify-content-center px-0 px-md-5 pb-md-5">
        {showCart ? (
          <Cart
            cartItems={cartItems}
            updateQuantity={(id, quantity) =>
              dispatch(updateQuantity({ id, quantity }))
            }
            removeItem={(id) => dispatch(removeItem(id))}
          />
        ) : (
          <>
            {/* Sidebar */}
            <Sidebar
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
            {/* Product List */}
            <Product
              products={products}
              activeCategory={activeCategory}
              addToCart={(product) => dispatch(addToCart(product))}
            />
          </>
        )}
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default ProductPage;
