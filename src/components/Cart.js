import React from 'react';
import '../styles/Cart.css';

const Cart = ({ cartItems, removeItem, updateQuantity }) => {
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = total > 0 ? 300 : 0;
  return (
    <>
      {/* 左側購物車商品列表 */}
      <div className="cart-container me-md-3">
        <div className="cart-title fw-bold text-center py-2">您的購物車</div>
        {cartItems.length === 0 ? (
          <p>購物車是空的。</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div
                className="cart-item d-flex align-items-end align-items-md-center justify-content-center justify-content-md-between flex-column flex-md-row p-5"
                key={item.id}
              >
                <div className="cart-item-image-container d-flex flex-row align-items-center">
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="cart-item-image"
                  />
                  {/* 網頁 */}
                  <div className="cart-item-name-price d-flex flex-column justify-content-between d-none d-md-block">
                    <span className="cart-item-name">{item.title}</span>
                    <span className="cart-item-price px-md-3">
                      NT$ {item.price}
                    </span>
                  </div>
                  {/* 數量 */}
                  <div className="cart-item-quantity d-flex flex-row text-center d-none d-md-block">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span className="quantity-number">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  {/* 手機 */}
                  <div className="d-flex flex-column d-md-none">
                    <div className="cart-item-name-price d-flex flex-column justify-content-center">
                      <span className="cart-item-name">{item.title}</span>
                      <span className="cart-item-price">NT$ {item.price}</span>
                    </div>
                    {/* 數量 */}
                    <div className="cart-item-quantity d-flex flex-row text-center">
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span className="quantity-number">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* 網頁總價 */}
                <div className="cart-item-total-price d-none d-md-block">
                  NT$ {item.price * item.quantity}
                </div>

                {/* 手機總價 */}
                <div className="cart-item-total-price d-md-none border-top border-bottom mt-3 py-3 w-100 text-end">
                  NT$ {item.price * item.quantity}
                </div>

                {/* 右側刪除按鈕 */}
                <button
                  className="remove-item d-none d-md-block"
                  onClick={() => removeItem(item.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* 右側訂單摘要 */}
      <div className="order-summary-container">
        <div className="summary-title d-flex justify-content-center align-items-center p-3 m-2">
          訂單摘要
        </div>
        <div className="order-summary d-flex flex-column gap-3 p-4">
          <div className="d-flex justify-content-between">
            <span>小計</span>
            <span>NT$ {total}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>運費</span>
            <span>NT$ {shipping}</span>
          </div>
          <div className="summary-total d-flex justify-content-between">
            <span>總計</span>
            <span>NT$ {total + shipping}</span>
          </div>
        </div>
        <button className="checkout-button d-flex justify-content-center align-items-center p-2">
          結帳
        </button>
      </div>
    </>
  );
};

export default Cart;
