const express = require('express');
const app = express();
app.set("view engine", "ejs");

// Middleware to serve static files
app.use(express.static('public'));

// Middleware to access the values in forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// // Debug logging middleware
// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// });

// Default route
app.get("/", (req, res) => {
    res.render("index");
});

// Defining routes for users using router
const userRouter = require('./routes/users');
app.use("/users", userRouter);

const uploadRouter = require('./routes/uploads');
app.use("/uploads",uploadRouter)

// Start server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
