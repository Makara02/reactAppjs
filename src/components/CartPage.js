import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './CartPage.css'; // Ensure you add the corresponding CSS file

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  const totalPrice = cart.reduce((total, product) => total + product.price, 0).toFixed(2);

  return (
    <div className="container py-5"  style={{marginTop:"200px"}}>
      <h1 className="text-center mb-4">Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <h2 className="text-center">Your cart is empty.</h2>
      ) : (
        <div>
          <div className="cart-items">
            {cart.map((product) => (
              <div className="cart-item card mb-4 shadow-sm" key={product.id}>
                <div className="card-body d-flex align-items-center">
                  <img
                    src={product.image}
                    className="card-img-top product-image"
                    alt={product.title}
                  />
                  <div className="product-details ml-4">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text text-muted">Price: ${product.price}</p>
                  </div>
                  <button
                    className="btn btn-danger ml-auto remove-btn"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Total: ${totalPrice}</h4>
            <Link to="/checkout" className="btn btn-success mt-3">Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
