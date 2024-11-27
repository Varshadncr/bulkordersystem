import React, { useState } from 'react';

import './OrderTracking.css';
const OrderTracking = () => {
    const [orderId, setOrderId] = useState('');
    const [order, setOrder] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        fetch(`http://localhost:5000/api/orders/${orderId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Order not found');
                }
                return response.json();
            })
            .then(data => {
                setOrder(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
                setOrder(null);
            });
    };

    return (
        <div className="order-tracking">
            {/* GIF displayed all the time */}
            <div className="gif-container">
                <img 
                    src="https://res.cloudinary.com/da41qeo0g/image/upload/v1732704138/38dc1e5f1060c443d927978bef79968c_ppqlpr.gif" 
                    alt="loading" 
                    style={{ width: '100%', maxWidth: '500px', margin: 'auto' }}
                />
            </div>


            <form onSubmit={handleSubmit}>
            <h2>Track Your Order</h2>
                <label>Order ID:</label>
                <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    required
                />
                <button type="submit">Track Order</button>
            </form>

            {/* Display loading message only when tracking an order */}
            {loading && <p>Loading...</p>}

            {/* Display error message if there was an issue */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Display order details after successful tracking */}
            {order && !loading && !error && (
                <div>
                    <h3>Order Details</h3>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Product ID:</strong> {order.product_id}</p>
                    <p><strong>Quantity:</strong> {order.quantity}</p>
                    <p><strong>Buyer Name:</strong> {order.buyer_name}</p>
                    <p><strong>Delivery Address:</strong> {order.delivery_address}</p>
                </div>
            )}
        </div>
    );
};

export default OrderTracking;
