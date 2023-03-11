const express = require('express');
const router = express.Router();

const Contact = require('../models/contact.js');


router.post('/', (request, response) => {
    Contact.create(request.body, (error, createdContact) => {
        response.redirect('/contact');
    });
});

module.exports = router;