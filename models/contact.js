const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    fName: {type: String},
    lName: {type: String},
    phone: {type: String},
    email: {type: String},
    reference: {type: String},
    questions: {type: String}
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;