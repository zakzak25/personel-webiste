const express = require('express');
const routes = express.Router();
require('dotenv').config();
const dbconnection = require('../database/db');



//main page
routes.get('/' , (req , res) => {
    res.render('index');
});

//registration page 
routes.get('/registration' , (req , res) => {
    res.render('signup');
});



//send data from html page to the back end
routes.post('/newUser' , (req , res)=> {
    const {username , email , password} = req.body
    dbconnection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username , email , password] , (err , result) => {
        if (err) {
            console.log("Err message : " + err.sqlMessage);
            console.log("sql message : " + err.sql);
        };
        res.send('<p>new user is succefully submited..</p>')
    });
});



module.exports= routes;