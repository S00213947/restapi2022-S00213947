const express = require('express')

require('dotenv').config();

const cocktails = require('./routes/cocktails') 
const mongoose  = require('mongoose');
const db = require('./database');
const home = require('./routes/home')

const app = express()
const port = process.env.PORT


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/cocktails', cocktails);
app.use('/home', home);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
