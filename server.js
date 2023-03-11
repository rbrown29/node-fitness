const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const mongoose = require('mongoose');
const db = mongoose.connection;

const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();

const Port = process.env.PORT;

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: "there is no fate but what we make for ourselves",
    resave: true,
    saveUninitialized: true
}));
app.use(cors(
    {origin: ['http://localhost:3000'], credentials: true, optionsSuccessStatus: 200}
));
app.use(morgan('dev'));

app.use('/contact', require('./controllers/contact.js'));

app.get('/', (request, responce) => {
    responce.render('index.ejs', {});
});
app.get('/about', (request, responce) => {
    responce.render('about.ejs', {});
});
app.get('/classes', (request, responce) => {
    responce.render('classes.ejs', {});
});
app.get('/nutrition', (request, responce) => {
    responce.render('nutrition.ejs', {});
});
app.get('/contact', (request, responce) => {
    responce.render('contact.ejs', {});
});
app.listen(Port, () => {
    console.log('listening on port', Port);
});