import React, { useEffect, useState } from 'react';
import './ProductPage.css';
import { useCart } from '../context/CartContext';
import styles from './HomePage.css';

const ProductPage = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const truncateTitle = (title, maxLength) => {
    if (title.length <= maxLength) return title;
    return `${title.slice(0, maxLength)}...`;
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) return description;
    return `${description.slice(0, maxLength)}...`;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <h2 className="text-center text-danger">Error: {error.message}</h2>;
  }

  return (
    <div className="container py-5 w-100"  style={{marginTop:"200px"}}>
      <div className="row w-100">
        <div className="col-lg-12">
          <div className="row">
            {products.map((product) => (
              <div className="col-md-3 " key={product.id} >
                <div className="card mb-4 product-wap rounded-0 ">
                  <div className="card rounded-0" >
                    <img
                      className="card-img rounded-0 img-fluid" 
                      src={product.image}
                      alt={product.title}
                    />
                    <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                      <ul className="list-unstyled">
                        <li>
                          <a
                            className="btn btn-success text-white"
                            href="#!"
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="far fa-heart"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            className="btn btn-success text-white mt-2"
                            href="#!"
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="far fa-eye"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            className="btn btn-success text-white mt-2"
                            href="#!"
                            onClick={() => addToCart(product)}
                          >
                            <i className="fas fa-cart-plus"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-body">
                    <a
                      href="#!"
                      className="h3 text-decoration-none"
                    >
                      {truncateTitle(product.title, 25)}
                    </a>
                    <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                      <li>{product.category}</li>
                      <li className="pt-2">
                        <span className="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                        <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                        <span className="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                      </li>
                    </ul>
                    <ul className="list-unstyled d-flex justify-content-center mb-1">
                      <li>
                        <i className="text-warning fa fa-star"></i>
                        <i className="text-warning fa fa-star"></i>
                        <i className="text-warning fa fa-star"></i>
                        <i className="text-muted fa fa-star"></i>
                        <i className="text-muted fa fa-star"></i>
                      </li>
                    </ul>
                    <p className="text-center mb-0">${product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
