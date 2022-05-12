const express = require('express');
const app = express();
const mongoose = require('mongoose');
//Middleware
//1. prevents cors errors
const cors = require('cors')
//2. Converts to JSON
const bodyParser = require('body-parser');
//
require('dotenv/config');

//Middleware
//
//
//
// 1. Test
app.use('/posts', ()=>{
    console.log('middleware hit')
});
// 2. Prevent cors error while working, 
// also does something for live usage? Maybe?
app.use(cors());
// 3. Body Parser, converts to JSON
app.use(bodyParser.json());


//Import Routes
const storesRoute = require('./routes/stores');
//This is middleware that appends on the /posts to any route stores.js
app.use('/stores', storesRoute);


//Routes
app.get('/', (req, res) =>{
    res.send('we are on home')
    
});



//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, ()=>{
    console.log('connected to database!')
});


app.listen(3000);

//patch update
//post add
