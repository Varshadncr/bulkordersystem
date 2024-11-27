
# Bulk Vegetable/Fruit Orders Web Application

## Objective
The objective of this project is to create a web application that allows buyers to place bulk vegetable/fruit orders and track their order status, while providing admins the ability to manage orders and inventory. Buyers can browse available products, place bulk orders, and view their order status, while admins can manage and update orders.

## Technologies Used
- **Frontend:** React.js, CSS
- **Backend:** Express.js
- **Database:** SQLite
- **API Testing:** Postman

## Features

### For Buyers:
1. **Browse Vegetables/Fruits:**
   - View a product catalogue with basic details such as product name and price.
   - No stock tracking required.

2. **Place Orders:**
   - Buyers can place bulk orders by selecting vegetables/fruits, specifying quantity, and providing delivery details (name, contact information, delivery address).
   - Each order is saved in the database with a unique order ID.

3. **Order Tracking:**
   - Buyers can track the status of their orders:
     - **Pending:** Order has been received.
     - **In Progress:** Order is being processed.
     - **Delivered:** Order has been delivered.

### For Admin:
1. **Order Management:**
   - Admins can view all placed orders with buyer details, delivery information, and ordered items.
   - Admins can update order statuses (Pending → In Progress → Delivered).

2. **Inventory Management:**
   - Admins can add, edit, or remove vegetables/fruits from the catalogue.

### Database
- **Database Engine:** SQLite (lightweight and simple for development).
- **API Testing:** Postman for testing API endpoints.

## Frontend
- **Framework:** React.js for building the user interface.
- **Styling:** Basic CSS for styling the frontend.

## Backend
- **Framework:** Express.js for building the backend API routes.
- **Database:** SQLite for storing orders and product information.

## Setup Instructions

### Prerequisites
- **Node.js** and **npm** (for React.js and Express.js)
- **SQLite** (for the database)
- **Postman** (for API testing)

### Steps to Run the Application

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Varshadncr/bulkordersystem.git
   cd bulkordersystem
   ```

2. **Install Dependencies:**
   - Install backend dependencies (Express.js):
     ```bash
     cd backend
     npm install
     ```
   - Install frontend dependencies (React.js):
     ```bash
     cd frontend
     npm install
     ```

3. **Start the Backend:**
   - Start the Express server:
     ```bash
     cd backend
     npm start
     ```

4. **Start the Frontend:**
   - Start the React development server:
     ```bash
     cd frontend
     npm start
     ```

5. **Access the Application:**
   - Open your browser and go to `http://localhost:3000` to access the web application.

6. **API Testing:**
   - Use **Postman** to test the backend API endpoints:
     - **GET /api/products** - Retrieve the product catalogue.
     - **POST /api/orders** - Place a new order.
     - **GET /api/orders/:id** - Track the status of an order.
     - **PUT /api/orders/:id** - Update the status of an order.
     - **POST /api/admin/products** - Add a new product.
     - **PUT /api/admin/products/:id** - Edit an existing product.
     - **DELETE /api/admin/products/:id** - Remove a product from the catalogue.

## GitHub Repository

You can access the source code and further details from the GitHub repository:

[https://github.com/Varshadncr/bulkordersystem](https://github.com/Varshadncr/bulkordersystem)

---

## Conclusion

This web application allows buyers to browse vegetables and fruits, place bulk orders, and track their order statuses, while providing admin functionality to manage orders and the product catalogue. Built using React.js for the frontend, Express.js for the backend, and SQLite for the database, this application aims to simplify the process of bulk vegetable and fruit ordering.

