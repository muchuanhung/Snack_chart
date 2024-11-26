import React from 'react';
import '../styles/Product.css';

const Product = ({ products, activeCategory, addToCart }) => {
  return (
    <>
      {products.length === 0 ? (
        <div>加載中...</div>
      ) : (
        <main className="product-list mx-4 mx-md-0">
          {products
            .filter(
              (product) =>
                activeCategory === '所有甜點' ||
                product.category === activeCategory
            )
            .map((product, index) => (
              <div className="product-card position-relative" key={product.id}>
                <div className="product-category position-absolute top-0 start-0 py-4 ms-3">
                  本日精選
                </div>
                <div className="product-image">
                  <img src={product.cover} loading="lazy" alt={product.image} />
                </div>
                <div className="product-info">
                  <span className="product-name">{product.title}</span>
                  <span className="product-price">NT$ {product.price}</span>
                </div>
                <button
                  className="add-to-cart"
                  onClick={(event) => {
                    event.preventDefault();
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
  );
};

export default Product;
