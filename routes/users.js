const express = require('express');
const router = express.Router();
const db = require('../database');

// Middleware for parsing URL-encoded and JSON data
router.use(express.urlencoded({ extended: true }));
router.use(express.json());


// Consent Page Route
router.get('/consent_form', (req, res) => {
    res.render("consent");
});

router.get('/tpo-attendance',(req,res)=>{
    return res.render('tpo_attendance')
})


module.exports = router;
