import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductCatalogue from './components/ProductCatalogue';
import OrderForm from './components/OrderForm';
import OrderTracking from './components/OrderTracking';
import AdminDashboard from './components/AdminDashboard';
import './App.css';  // Import the CSS file

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        'https://res.cloudinary.com/da41qeo0g/image/upload/v1732699285/3b360279-8b43-40f3-9b11-604749128187_fumyle.jpg',
        'https://res.cloudinary.com/da41qeo0g/image/upload/v1732698956/57e4be9d-1ba1-48ec-b249-cda9e836e29f_cifgjj.jpg',
        'https://res.cloudinary.com/da41qeo0g/image/upload/v1732699284/fruits-good-for-the-heart-scaled_amxbun.jpg'
    ];

    // Slideshow functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds
        return () => clearInterval(interval);
    }, [images.length]);
     
    return (
        <div className="home">
            {/* Slideshow Section */}
            <div className="slideshow-container">
                <img src={images[currentIndex]} alt="Slideshow" className="slideshow-image" />
            </div>

            <div className="content-section">
                {/* Welcome Text */}
                <h1>Welcome to Our Vegan Food</h1>
                <p>Fresh, Organic, and Healthy Products Delivered Right to Your Doorstep!</p>
            </div>

            {/* Who We Are Section */}
            <section className="who-we-are">
                <h2>Who We Are</h2>
                <p>We are passionate about delivering the finest organic vegetables and fruits to our customers. Our goal is to promote healthy living by offering only the best produce.</p>
            </section>

            {/* Why Choose Us Section */}
            <section className="why-choose-us">
                <h2>Why Choose Us?</h2>
                <ul>
                    <li>100% Organic and Fresh Products</li>
                    <li>Fast and Reliable Delivery</li>
                    <li>Affordable Prices with Great Discounts</li>
                    <li>Committed to Customer Satisfaction</li>
                </ul>
            </section>

            {/* Call to Action */}
            <section className="cta">
                <h3>Shop with Us Today!</h3>
                <Link to="/products">
                    <button className="cta-button">Browse Products</button>
                </Link>
            </section>

            {/* Footer Section */}
            <footer className="footer">
                <div className="footer-content">
                    {/* Logo */}
                    <img src="https://res.cloudinary.com/da41qeo0g/image/upload/v1732699895/pngtree-logo-design-of-exquisite-vegetables-png-image_3039538_csmmfc.jpg" alt="Logo" className="footer-logo" />

                    {/* Contact Information */}
                    <div className="footer-info">
                        <p>Email: <a href="mailto:bulkoder@gmail.com">bulkoder@gmail.com</a></p>
                        <p>Phone: <a href="tel:+912345678901">+91 234 567 8901</a></p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

function App() {
    return (
        <Router>
            <div className="container">
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Browse Products</Link></li>
                        <li><Link to="/place-order">Place an Order</Link></li>
                        <li><Link to="/track-order">Track Your Order</Link></li>
                        <li><Link to="/admin">Admin Dashboard</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductCatalogue />} />
                    <Route path="/place-order" element={<OrderForm />} />
                    <Route path="/track-order" element={<OrderTracking />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
