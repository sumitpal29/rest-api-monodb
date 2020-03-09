// Load all configuration froms dotenv
require('dotenv').config();
// pulling the express library
const express = require('express');
// pulling mongoose for connecting with our server
const mongoose = require('mongoose');
// connect moongose with database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// setting up some events for databse connection
const db = mongoose.connection; // DATABASE VARIABLE
db.on('error', err => console.error('Failed to connect with database'));
db.once('open', () => console.log('Successfully connected with the database!!'));

// app intilised
const app = express();

// database hoocked up, app initialised
// congigure app to except JSON data, for that we need to write a middleware function
// server get requtes before it is passed to routes
app.use(express.json()); //  this will allow the server to allow to accpet json as body inside GET/POST request
// since we are going to have blog api for different operations
// there should be some routes for each operations
// let's create a blog api routes
const blogRouter = require('./routes/blogs');
// when to use blogRouter
app.use('/blogpost', blogRouter);
// setting up port
app.listen(3000, ()=> console.log('yo server started!!'))