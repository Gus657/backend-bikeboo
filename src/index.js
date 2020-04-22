const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret: 'gus657',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

require('./database');
require('./passport/login');
app.use(require('./routes'));


app.listen(PORT, ()=>{console.log('Server Running')});