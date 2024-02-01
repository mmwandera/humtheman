require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const connectDB = require('./server/config/db');

const app = express();
const PORT = 3000 || process.env.PORT;

// Connect to db
connectDB();

// Middleware
// To pass data through forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main.js'));
app.use('/', require('./server/routes/admin.js'));

app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`)
})