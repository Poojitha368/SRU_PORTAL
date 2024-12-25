const express = require('express');
const router = express.Router();
const db = require('../database');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

// Define the directory for uploaded files
const uploadDir = path.join(__dirname, '../public/uploads');


router.post('/submit-consent', (req, res) => {
    // Check if the user is logged in
    if (!req.session || !req.session.user) {
        console.error('Session or user data missing');
        return res.status(403).send('You must be logged in to submit the form.');
    }

    const username = req.session.user.username;
    console.log('Logged-in username:', username);

    const form = formidable({
        uploadDir,
        multiples: false,
        keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error('Error parsing form:', err);
            return res.status(500).send('Error processing form data.');
        }

        const imageUrl = '/uploads/' + path.basename(files.image.path);
        const { date_from, date_to } = fields;
        const submit_time = new Date();
        const htno = username;

        const query = 'INSERT INTO consent_form (date_from, date_to, image_url, submitted_time, htno) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [date_from, date_to, imageUrl, submit_time, htno], (err) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).send('Error saving consent data');
            }
            res.send(`
                <h1>Form Submitted Successfully!</h1>
                <p>Thank you for submitting your consent form.</p>
                <p>Submission Time: ${submit_time}</p>
                <a href="/users/consent_form" style="text-decoration: none; color: blue;">Go back to the consent form</a>
            `);
        });
    });
});



module.exports = router;