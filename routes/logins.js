const express = require('express');
const router = express.Router();
const db = require('../database');
const session = require('express-session');

// Middleware to parse request body
router.use(express.urlencoded({ extended: true }));
router.use(express.json());



// GET: Login Page
router.get('/login', (req, res) => {
    console.log("Navigated to login page");
    res.render("login", { error: null });
});

// POST: Login Functionality
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.render("login", { error: "Username and password are required." });
    }

    try {
        const query = "SELECT user_id, role_id, username FROM user WHERE username = ? AND password = ?";
        
        // Query the database
        db.query(query, [username, password], (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).send("Internal Server Error");
            }

            if (results.length > 0) {
                console.log("Login successful!");

                const user = results[0];
                req.session.user = {
                    role_id: user.role_id,
                    user_id: user.user_id,
                    username: user.username
                };

                console.log(req.session.user.user_id)
                console.log(req.session.user.role_id)
                console.log(req.session.user.username)

                // Redirect based on role_id
                if (user.role_id === 3) {
                    return res.redirect('/users/consent_form');
                } else {
                    return res.redirect('/users/tpo-attendance');
                }
            } else {
                return res.render("login", { error: "Invalid username or password." });
            }
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).send("An error occurred during login.");
    }
});

// Logout Route
router.get('/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy(err => {
            if (err) {
                console.error("Error during logout:", err);
                return res.status(500).send("An error occurred during logout.");
            }
            console.log("User logged out successfully!");
            res.redirect('/login'); // Redirect to the login page after successful logout
        });
    } else {
        res.redirect('/login'); // Redirect to login if no user is logged in
    }
});


module.exports = router;
