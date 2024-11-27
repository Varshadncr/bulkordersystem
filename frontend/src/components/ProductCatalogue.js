import React, { useState, useEffect } from 'react';
import './ProductCatalogue.css'; 

const ProductCatalogue = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Fetching products from the backend API
    useEffect(() => {
        fetch('http://localhost:5000/api/products') // Assuming your API endpoint is this
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    // Function to open the modal with product details
    const handleViewDetails = (product) => {
        setSelectedProduct(product);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="product-catalogue">
            <h1>Explore Our Fresh Products</h1>
            <div className="product-list">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product.id} className="product-item">
                            <div className="product-card">
                                <img
                                    src={product.image_url || 'https://res.cloudinary.com/da41qeo0g/image/upload/v1732699285/01-healthiest-fruits-vegetables-REV02_egeuem.jpg'}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <p><strong>Price:</strong> ${product.price}</p>
                                    <button
                                        onClick={() => handleViewDetails(product)}
                                        className="view-details-button"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products available at the moment.</p>
                )}
            </div>

            {/* Modal to display product details */}
            {selectedProduct && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button onClick={handleCloseModal} className="close-button">X</button>
                        <h2>{selectedProduct.name}</h2>
                        <img
                            src={selectedProduct.image_url || 'default-image.png'}
                            alt={selectedProduct.name}
                            className="modal-image"
                        />
                        <p>{selectedProduct.description}</p>
                        <p><strong>Price:</strong> ${selectedProduct.price}</p>
                        <p><strong>Category:</strong> {selectedProduct.category}</p>
                        <p><strong>Stock Availability:</strong> {selectedProduct.stock}</p>
                        {/* OK button to close modal */}
                        <button onClick={handleCloseModal} className="ok-button">OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductCatalogue;
