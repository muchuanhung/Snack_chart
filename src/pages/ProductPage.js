import React, { useState, useEffect } from 'react';
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
  const [cartItems, setCartItems] = useState(() => {
    // 初始化時從 localStorage 加載購物車資料
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [cartCount, setCartCount] = useState(0);
  const [showCart, setShowCart] = useState(false);

  // 取得產品資料
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

  // 計算購物車商品總數
  useEffect(() => {
    const totalCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartCount(totalCount);

    // 同步購物車資料到 localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // 新增商品到購物車
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      const updatedCart = existingItem
        ? prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevItems, { ...product, quantity: 1 }];

      // 儲存到 localStorage
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // 更新商品數量
  const updateQuantity = (id, quantity) => {
    const updatedCart = setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );

    // 儲存到 localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    return updatedCart;
  };

  // 刪除商品
  const removeItem = (id) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item.id !== id);

      // 儲存到 localStorage
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

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
      <div className="content d-flex flex-column flex-md-row justify-content-center px-0 px-md-5 pb-5">
        {showCart ? (
          <Cart
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
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
              addToCart={addToCart}
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
