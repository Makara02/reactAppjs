import React, { useState, useEffect } from 'react';
import './ProductSearch.css'; // Import your CSS file

const ProductSearch = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch products when the component mounts
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
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = () => {
        if (!searchTerm) {
            alert("Please enter a search term.");
            return;
        }
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="product-search-container">
            <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                placeholder="Search for products..."
                className="search-input"
            />
            <button onClick={handleSearch} className="search-button">Search</button>
            <div className="product-list">
                {filteredProducts.map(product => (
                    <div key={product.id} className="product-card">
                        <h2 className="product-name">{product.title}</h2>
                        <p className="product-description">{product.description}</p>
                        <p className="product-price">${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductSearch;