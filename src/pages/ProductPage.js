import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Cart from '../components/Cart';
import '../styles/ProductPage.css';
import '../styles/Global.css';
import headerlogo from '../assets/source/logo-all-dark.svg';
import bannerimg from '../assets/source/photo-1512484457149-266d165a4eca.avif';
import bannerslogn from '../assets/source/lg-想吃甜點是不需要理由的.svg';
import footericon from '../assets/source/logo-light.svg';
import footerlogo from '../assets/source/logotype-sm-dark.svg';
import footerslogn from '../assets/source/sm-今天是個吃甜點的好日子.svg';
import iconline from '../assets/source/ic-line@.svg';
import iconfacebook from '../assets/source/ic-facebook.svg';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('所有甜點');
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const categories = [
    { name: '所有甜點', count: 48 },
    { name: '本日精選', count: 10 },
    { name: '人氣推薦', count: 26 },
    { name: '新品上市', count: 12 },
  ];

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

  // 新增商品到購物車
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // 更新商品數量
  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  // 刪除商品
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <>
      {/* Navbar */}
      <header className="header">
        <img
          className="headerlogo"
          src={headerlogo}
          alt="Logo"
          onClick={() => setShowCart(false)}
        />
        <div className="cart-icon" onClick={() => setShowCart(true)}>
          <FaShoppingCart size={24} />
        </div>
      </header>
      {/* Banner */}
      <div className="banner">
        <img className="bannerimg" src={bannerimg} alt="Banner" />
        <img className="bannerslogn" src={bannerslogn} alt="Banner_slogn" />
      </div>
      {/* Body */}
      <div className="content">
        {showCart ? (
          <Cart
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        ) : (
          <>
            <aside className="sidebar">
              <div className="sidebar-category">甜點類別</div>
              <ul className="p-0">
                {categories.map((category) => (
                  <li
                    key={category.name}
                    className={activeCategory === category.name ? 'active' : ''}
                    onClick={() => setActiveCategory(category.name)}
                  >
                    {category.name} ({category.count})
                  </li>
                ))}
              </ul>
            </aside>
            {products.length === 0 ? (
              <div>加載中...</div>
            ) : (
              <main className="product-list">
                {products
                  .filter(
                    (product) =>
                      activeCategory === '所有甜點' ||
                      product.category === activeCategory
                  )
                  .map((product, index) => (
                    <div className="product-card" key={product.id}>
                      <div className="product-image">
                        <img src={product.cover} alt={product.image} />
                      </div>
                      <div className="product-info">
                        <span className="product-name">{product.title}</span>
                        <span className="product-price">
                          NT$ {product.price}
                        </span>
                      </div>
                      <button
                        preventDefault
                        className="add-to-cart"
                        onClick={() => {
                          addToCart(product);
                        }}
                      >
                        加入購物車
                      </button>
                    </div>
                  ))}
              </main>
            )}
          </>
        )}
      </div>
      {/* Footer */}
      <footer>
        {/* Logo 與訂閱區域 */}
        <div className="subscribe d-flex">
          <div className="col-md-6 d-flex align-items-center">
            <img
              className="footericon px-4"
              src={footericon}
              alt="FooterIcon"
            />
            <div>訂閱你我的甜蜜郵件</div>
          </div>
          <div className="col-md-6">
            <form
              className="subscription-form d-flex"
              onSubmit={(e) => {
                e.preventDefault();
                alert('感謝訂閱！');
              }}
            >
              <div className="input-group">
                <span className="input-group-text">
                  <i className="pe-2 bi bi-envelope-fill"></i>
                  <input type="email" placeholder="輸入您的電子郵件" />
                </span>
                <button type="submit" className="input-group-arrow">
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* 聯絡資訊 */}
        <div className="info d-flex">
          <div className="col-md-6">
            <img className="footerlogo" src={footerlogo} alt="FooterLogo" />
            <div className="info-text d-flex flex-column">
              {[
                '07-1234-5678',
                'sweettaste@email.com',
                '800 高雄市新興區幸福路 520 號',
              ].map((info, index) => (
                <div key={index}>{info}</div>
              ))}
            </div>
            <div className="info-icon d-flex">
              <img
                className="info-icon-line me-2"
                src={iconline}
                alt="icon-line"
              />
              <img
                className="info-icon-facebook"
                src={iconfacebook}
                alt="icon-facebook"
              />
            </div>
          </div>
          <div className="col-md-6 d-flex flex-column align-items-end">
            <img className="footerslogn" src={footerslogn} alt="footer-slogn" />
            <div className="info-copyright">
              © 2018 Sweetaste* All Rights Reserved
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ProductPage;
