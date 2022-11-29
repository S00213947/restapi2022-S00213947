
require('dotenv').config();
const port = process.env.PORT

const express = require('express')
const cocktails = require('./routes/cocktails') 
const mongoose  = require('mongoose');
const db = require('./database');
const home = require('./routes/home')
const users = require('./routes/users');
const passport = require('passport');
const {User} = require('./models/users');
const cors = require('cors');

const app = express()


// Passport Config
passport.use(User.createStrategy());
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use('/cocktails', cocktails);
app.use('/home', home);
app.use('/users', users);

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  app.use( cors(corsOptions));
  app.use('/cocktails', cors(), (cocktails)); 
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
