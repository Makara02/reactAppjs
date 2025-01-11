import React, { useState, useEffect } from 'react';  
import { useCart } from '../context/CartContext';  

const CheckoutPage = () => {  
  const { cart } = useCart();  
  const [showModal, setShowModal] = useState(false);  
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);  

  // Calculate total price  
  const totalPrice = cart.reduce((total, product) => total + product.price, 0).toFixed(2);  

  const handleApprove = (data, actions) => { 
    return actions.order.capture().then((details) => { 
      console.log('Transaction completed by ' + details.payer.name.given_name); 
      setPurchaseSuccess(true); 
      setShowModal(true); 
    }); 
  }; 

  const handleError = (err) => { 
    console.error('PayPal Checkout Error', err); 
    setPurchaseSuccess(false); 
    setShowModal(true); 
  }; 

  useEffect(() => { 
    // Load PayPal script dynamically 
    const script = document.createElement('script'); 
    script.src = 'https://www.paypal.com/sdk/js?client-id=AeEWWGy_fS7h660E_LwnkiKaZ0VWEaFnpA_wzudCncTu7wNDA5X-H45k2RVCo1S4FfQML6CpgciyHDs9'; 
    script.async = true; 
    script.onload = () => { 
      window.paypal.Buttons({ 
        createOrder: (data, actions) => { 
          return actions.order.create({ 
            purchase_units: [{ 
              amount: { 
                value: totalPrice, 
              }, 
            }], 
          }); 
        }, 
        onApprove: handleApprove, 
        onError: handleError, 
      }).render('#paypal-button-container'); 
    }; 
    document.body.appendChild(script); 
  }, [totalPrice]); 

  return (  
    <div className="container mt-4">  
      <h1 className="text-center mb-4" style={{ marginTop: "200px" }}>Checkout</h1>  
      {cart.length === 0 ? (  
        <h2 className="text-center">Your cart is empty. Please add items to your cart.</h2>  
      ) : (  
        <div>  
          <h2>Your Items:</h2>  
          <ul className="list-group mb-4">  
            {cart.map((product, index) => (  
              <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>  
                <div>  
                  <h5 className="mb-1">{product.title}</h5>  
                  <p className="mb-1">Price: ${product.price}</p>  
                </div>  
              </li>  
            ))}  
          </ul>  
          <h4 className="text-right">Total: ${totalPrice}</h4>  

          {/* PayPal Button Container */}  
          <div id="paypal-button-container" className="text-center mt-4"></div>  
        </div>  
      )}  

      {/* Modal for Success/Failure */}  
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-hidden={!showModal}>  
        <div className="modal-dialog" role="document">  
          <div className="modal-content">  
            <div className="modal-header">  
              <h5 className="modal-title">{purchaseSuccess ? 'Purchase Successful!' : 'Purchase Failed!'}</h5>  
              <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">  
                <span aria-hidden="true">&times;</span>  
              </button>  
            </div>  
            <div className="modal-body">  
              <p>{purchaseSuccess ? 'Thank you for your purchase!' : 'There was a problem with your purchase. Please try again.'}</p>  
            </div>  
            <div className="modal-footer">  
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>  
                <a href='/' style={{ textDecoration: "none" }}>Close</a>  
              </button>  
            </div>  
          </div>  
        </div>  
      </div>  
    </div>  
  );  
};  

export default CheckoutPage;