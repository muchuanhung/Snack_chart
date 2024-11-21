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
      <div className="cart-container me-3">
        <div className="cart-title fw-bold text-center py-2">您的購物車</div>
        {cartItems.length === 0 ? (
          <p>購物車是空的。</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={item.cover}
                  alt={item.title}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.title}</span>
                  <span className="cart-item-price">NT$ {item.price}</span>
                  <div className="cart-item-quantity">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="remove-item"
                  onClick={() => removeItem(item.id)}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* 右側訂單摘要 */}
      <div className="order-summary-container">
        <div className="summary-title d-flex justify-content-center align-items-center border-bottom m-2">
          訂單摘要
        </div>
        <div className="order-summary d-flex flex-column gap-3 p-4">
          <div className="summary-item">
            <span>小計</span>
            <span>NT$ {total}</span>
          </div>
          <div className="summary-item">
            <span>運費</span>
            <span>NT$ {shipping}</span>
          </div>
          <div className="summary-total">
            <span>總計</span>
            <span>NT$ {total + shipping}</span>
          </div>
        </div>
        <button className="checkout-button d-flex justify-content-center p-2">
          結帳
        </button>
      </div>
    </>
  );
};

export default Cart;
