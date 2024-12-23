const express = require('express');
const router = express.Router();
const db = require('../database');
const session = require('express-session');


// Middleware for sessions
router.use(session({
    secret: 'Sru-portal-training-session-data', // Replace with a strong secret key
    resave: false,             // Prevents session being saved if unmodified
    saveUninitialized: false,  // Prevents uninitialized sessions being saved
    cookie: {                  // Options for the session cookie
        secure: false,         // Set to `true` if using HTTPS
        maxAge: 1000 * 60 * 60 // 1 hour
    }
}));


// Middleware for parsing URL-encoded and JSON data
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Login Route
router.route("/login")
    .get((req, res) => {
        res.render("login", { error: null });
    })
    .post(async (req, res) => {
        const { username, password } = req.body;
        try {
            const query = "SELECT user_id,role_id,username FROM user WHERE username = ? AND password = ?";
            const result = await new Promise((resolve, reject) => {
                db.query(query, [username, password], (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });

            if (result.length > 0) {
                console.log("Login successful");
                const user = result[0];

                // Store session data
                req.session.user = {
                    username: user.username,
                    user_id: user.user_id,
                    role_id: user.role_id
                };
                console.log(req.session.user.username)
                console.log(req.session.user.user_id)
                console.log(req.session.user.role_id)
                if(req.session.role_id==3){
                    return res.redirect('/users/consent')
                }
                else if(req.session.user.role_id==1){
                    return res.redirect('/users/tpo-attendance')
                }
            } else {
                return res.render("login", { error: "Invalid username or password" });
            }
        } catch (error) {
            console.error("Error during login:", error);
            return res.status(500).send("An error occurred during login.");
        }
    });

router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            
        }
    })
})

// Consent Page Route
router.get('/consent', (req, res) => {
    res.render("consent");
});

router.get('/tpo-attendance',(req,res)=>{
    return res.render('tpo_attendance')
})






module.exports = router;
