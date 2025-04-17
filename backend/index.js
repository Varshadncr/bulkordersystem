const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());
app.use(cors());

// Set up SQLite database
const db = new sqlite3.Database('./orders.db', (err) => {
    if (err) {
        console.error("Failed to connect to database", err);
    } else {
        console.log("Connected to the SQLite database.");
    }
});

// Initialize tables (products and orders)
db.serialize(() => {
    db.run("DROP TABLE IF EXISTS products"); // Remove this line in production
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price REAL,
        description TEXT,
        stock INTEGER
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER,
        quantity INTEGER,
        buyer_name TEXT,
        buyer_contact TEXT,
        delivery_address TEXT,
        status TEXT
    )`);
});

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Bulk Vegetable/Fruit Ordering System API');
});

// Get all products
app.get('/api/products', (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) {
            res.status(500).json({ message: "Error fetching products" });
        } else {
            res.json(rows);
        }
    });
});

// Add new product
app.post('/api/products', (req, res) => {
    const { name, price, description, stock } = req.body;
    db.run(
        "INSERT INTO products (name, price, description, stock) VALUES (?, ?, ?, ?)",
        [name, price, description, stock],
        function (err) {
            if (err) {
                res.status(500).json({ message: "Error adding product" });
            } else {
                res.status(201).json({
                    id: this.lastID,
                    name,
                    price,
                    description,
                    stock
                });
            }
        }
    );
});

// Update product
app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, description, stock } = req.body;
    db.run(
        "UPDATE products SET name = ?, price = ?, description = ?, stock = ? WHERE id = ?",
        [name, price, description, stock, id],
        function (err) {
            if (err) {
                res.status(500).json({ message: "Error updating product" });
            } else {
                res.json({ message: "Product updated", id, name, price, description, stock });
            }
        }
    );
});

// Delete product
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM products WHERE id = ?", [id], function (err) {
        if (err) {
            res.status(500).json({ message: "Error deleting product" });
        } else {
            res.json({ message: "Product deleted successfully" });
        }
    });
});

// Create new order
app.post('/api/orders', (req, res) => {
    const { product_id, quantity, buyer_name, buyer_contact, delivery_address } = req.body;
    const status = 'Pending';
    db.run(
        "INSERT INTO orders (product_id, quantity, buyer_name, buyer_contact, delivery_address, status) VALUES (?, ?, ?, ?, ?, ?)",
        [product_id, quantity, buyer_name, buyer_contact, delivery_address, status],
        function (err) {
            if (err) {
                res.status(500).json({ message: "Error placing order" });
            } else {
                res.status(201).json({
                    id: this.lastID,
                    product_id,
                    quantity,
                    buyer_name,
                    buyer_contact,
                    delivery_address,
                    status
                });
            }
        }
    );
});

// Get single order by ID
app.get('/api/orders/:id', (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM orders WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).json({ message: "Error fetching order" });
        } else {
            res.json(row);
        }
    });
});

// Update order status (user)
app.put('/api/orders/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    db.run("UPDATE orders SET status = ? WHERE id = ?", [status, id], function (err) {
        if (err) {
            res.status(500).json({ message: "Error updating order" });
        } else {
            res.json({ id, status });
        }
    });
});

// Admin: Get all orders
app.get('/api/admin/orders', (req, res) => {
    db.all("SELECT * FROM orders", [], (err, rows) => {
        if (err) {
            res.status(500).json({ message: "Error fetching orders" });
        } else {
            res.json(rows);
        }
    });
});

// Admin: Update order status
app.put('/api/admin/orders/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    db.run("UPDATE orders SET status = ? WHERE id = ?", [status, id], function (err) {
        if (err) {
            res.status(500).json({ message: "Error updating order status" });
        } else {
            res.json({ message: "Order status updated", id, status });
        }
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
