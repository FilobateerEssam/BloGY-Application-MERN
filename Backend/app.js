const express = require('express');
const connectToDb = require('./config/connectToDb');
// make us read from env 
require('dotenv').config();
// contect to DB

connectToDb();

// Init App

const app = express();

// Middlewares

app.use(express.json())


// Routes

app.use('/api/auth',require('./routes/authRoute'));

// Running Server

const PORT = process.env.PORT || 8000;
app.listen(PORT,() =>console.log(`server is Running in ${process.env.NODE_ENV} mode on Port ${PORT}`
)
);