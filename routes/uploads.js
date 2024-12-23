const express = require('express');
const router = express.Router();
const db = require('../database');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');


// Path to the uploads directory
const uploadDir = path.join(__dirname, '../public/uploads');

// Consent Submission Route
router.post('/submit-consent', (req, res) => {
    const form = formidable({
        uploadDir, // Directory to save uploaded files
        multiples: false,
        keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error('Error parsing form:', err);
            return res.status(500).send('Error processing form data.');
        }

        console.log('Fields:', fields); // Log form fields
        console.log('Files:', files);   // Log uploaded files

        // Ensure an image was uploaded
        if (!files.image || !files.image.path) {
            return res.status(400).send("Image upload is required.");
        }

        // Use the uploaded file's path to create the URL
        const imageUrl = '/uploads/' + path.basename(files.image.path);
        console.log('Image URL:', imageUrl);

        const { date_from, date_to } = fields;
        const submit_time = new Date();
        const hallticket = req.session.user.username;

        // Insert data into the database
        const query = 'INSERT INTO consent_form (date_from, date_to, image_url, submitted_time,htno) VALUES (?, ?, ?,?)';
        db.query(query, [date_from, date_to, imageUrl,submit_time,hallticket], (err) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).send('Error saving consent data');
            }
            res.send(`
                <h1>Form Submitted Successfully!</h1>
                <p>Thank you for submitting your consent form.</p>
                <p>Submission Time: ${submit_time}</p>
                <a href="/users/consent" style="text-decoration: none; color: blue;">Go back to the consent form</a>
            `);
        });
    });
});

module.exports = router;