const path = require('path')
const express = require('express');

const morgan = require('morgan')
 
const cors = require('cors')

const dotenv = require('dotenv').config();
const fileupload = require("express-fileupload")
const connectDb = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');

connectDb()

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(express.json())
console.log('MONGO_URI:', process.env.MONGO_URI);

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
};
app.use(fileupload())
app.use(express.static(path.join(__dirname , 'public')))
app.use('/api/books',require('./routes/bookRoutes'));
app.use('/api/auth',require('./routes/authRoutes'));
app.use('/api/favorite',require('./routes/favoriteRoutes'));
app.use('/api/users',require('./routes/userRoutes'));
app.use(errorHandler)
app.listen(port, () => console.log('Server Started On Port ' + port))