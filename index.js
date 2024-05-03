
require('dotenv').config();
const port = process.env.PORT

const express = require('express')
const path = require('path');
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



var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  app.use( cors(corsOptions));

  //routes
  app.use('/cocktails', require('./routes/cocktails'));
app.use('/home', require('./routes/home'));
app.use('/users', require('./routes/users'));
 
app.use(express.static(path.join(__dirname, 'dist/client-app2022')));

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/client-app2022/index.html'));
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
