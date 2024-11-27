import React, { useState, useEffect } from 'react';
import './OrderForm.css'; // Assuming you have a CSS file for styling

const OrderForm = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        product_id: '',
        quantity: '',
        buyer_name: '',
        buyer_contact: '',
        delivery_address: ''
    });
    const [error, setError] = useState('');

    // Fetch products when component mounts
    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch((err) => {
                setError('Failed to load products.');
            });
    }, []);

    // Handle form field changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Simple validation
        if (!formData.product_id || !formData.quantity || !formData.buyer_name || !formData.buyer_contact || !formData.delivery_address) {
            setError('Please fill all the fields.');
            return;
        }
        
        // Clear previous error
        setError('');

        fetch('http://localhost:5000/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to place order');
            }
            return response.json();
        })
        .then(data => {
            alert('Order placed successfully!');
            setFormData({
                product_id: '',
                quantity: '',
                buyer_name: '',
                buyer_contact: '',
                delivery_address: ''
            });
        })
        .catch(error => {
            setError(error.message);
        });
    };

    return (
        <div className="order-form">
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
            <h2>Place an Order</h2>
                <label>Product:</label>
                <select name="product_id" value={formData.product_id} onChange={handleChange}>
                    <option value="">Select a product</option>
                    {products.map(product => (
                        <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                </select>

                <label>Quantity:</label>
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                    required
                />

                <label>Name:</label>
                <input
                    type="text"
                    name="buyer_name"
                    value={formData.buyer_name}
                    onChange={handleChange}
                    required
                />

                <label>Contact:</label>
                <input
                    type="text"
                    name="buyer_contact"
                    value={formData.buyer_contact}
                    onChange={handleChange}
                    required
                />

                <label>Delivery Address:</label>
                <input
                    type="text"
                    name="delivery_address"
                    value={formData.delivery_address}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default OrderForm;
