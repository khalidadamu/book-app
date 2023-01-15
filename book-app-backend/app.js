const express = require('express');
const app = express();

const bookRoutes = require('./api/routes/books');
const userRoutes = require('./api/routes/user');


const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

mongoose.connect('mongodb+srv://khalidadamu:<khalidadamu>@cluster0.p0ch1pt.mongodb.net/?retryWrites=true&w=majority');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

