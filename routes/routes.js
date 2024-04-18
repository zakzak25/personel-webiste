const express = require('express');
const routes = express.Router();
require('dotenv').config();
const dbconnection = require('../database/db');
const bcrypt = require('bcrypt');



//main page
routes.get('/' , (req , res) => {
    res.render('index');
});

//registration page 
routes.get('/registration' , (req , res) => {
    res.render('signup' , {title : 'Sign up page '});
});



//send data from html page to the back end
routes.post('/newUser' , async (req , res)=> {
    try {
        const {username, email ,password} = req.body;
        dbconnection.query('SELECT email FROM users WHERE email = ?;', [email] , async (err , result) => {
           if (result.length === 0) {
            let hachedPassword = await bcrypt.hash(password , 8);
                dbconnection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username , email , hachedPassword] , (err) => {
                    if (err) {
                        console.log("Err message : " + err.sqlMessage);
                        console.log("sql message : " + err.sql);
                    }else {
                        res.send('<p>new user is succefully submited..</p>');
                    }
                });
           }else {
            res.render('signup' , {exist : true, message : 'email already exist, please <a href="/sign in" here.!'});
           }
        });
    }
    catch(err) {
        console.log('Error:' , err);
        res.status(500).send('An unexprected error occured.');
    };
});



module.exports= routes;