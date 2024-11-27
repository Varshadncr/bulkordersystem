import React, { useState, useEffect } from 'react';
import './AdminDashboard.css'; // Import the CSS file for styling

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: ''
    });

    useEffect(() => {
        fetch('http://localhost:5000/api/admin/orders')
            .then(response => response.json())
            .then(data => setOrders(data));

        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const updateStatus = (id, newStatus) => {
        fetch(`http://localhost:5000/api/admin/orders/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        }).then(() => {
            setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
        });
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const { name, price, description } = newProduct;
        fetch('http://localhost:5000/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, description })
        })
        .then(response => response.json())
        .then(data => {
            setProducts([...products, data]);
            setNewProduct({ name: '', price: '', description: '' });
        })
        .catch(error => console.error('Error adding product:', error));
    };

    const handleDeleteProduct = (id) => {
        fetch(`http://localhost:5000/api/products/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            setProducts(products.filter(product => product.id !== id));
        })
        .catch(error => console.error('Error deleting product:', error));
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>

            {/* Product Management Section */}
            <section className="product-section">
                <h2>Manage Products</h2>
                <form onSubmit={handleAddProduct} className="product-form">
                    <div className="input-group">
                        <label>Product Name:</label>
                        <input
                            type="text"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Price:</label>
                        <input
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Description:</label>
                        <textarea
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="add-btn">Add Product</button>
                </form>

                {/* List of products */}
                <h3>Product List</h3>
                <ul className="product-list">
                    {products.map((product) => (
                        <li key={product.id} className="product-item">
                            <span>{product.name} - ₹{product.price}</span>
                            <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Order Management Section */}
            <section className="order-section">
                <h2>Manage Orders</h2>
                <ul className="order-list">
                    {orders.map(order => (
                        <li key={order.id} className="order-item">
                            <strong>Order #{order.id}</strong> - {order.status}
                            <br />
                            <span>{order.buyer_name} - {order.delivery_address}</span>
                            <br />
                            <div className="order-actions">
                                <button
                                    className="status-btn"
                                    onClick={() => updateStatus(order.id, 'In Progress')}
                                >
                                    Mark as In Progress
                                </button>
                                <button
                                    className="status-btn"
                                    onClick={() => updateStatus(order.id, 'Delivered')}
                                >
                                    Mark as Delivered
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default AdminDashboard;
