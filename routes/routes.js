const express = require('express');
const routes = express.Router();
require('dotenv').config();
const dbconnection = require('../database/db');
const bcrypt = require('bcrypt');



//main page
routes.get('/' , (req , res) => {
    res.render('index',{title: 'Main page' ,autanticated : false});
});

//about page
routes.get('/about' , (req , res) => {
    res.status(200).render('about' ,{title : 'About' ,autanticated : false})
});

//service page
routes.get('/services' , (req , res) => {
    res.status(200).render('services' ,{title : 'About' ,autanticated : false})
});

//contact page route
routes.get('/contact' , (req , res) => {
    res.status(200).render('contact' , {title : 'Contact' , autanticated : false })
})


//registration page 
routes.get('/registration' , (req , res) => {
    res.render('signup' , {title : 'Sign up page',exist: false});
});

//login page
routes.get('/login' , (req , res) => {
    res.render('login' , {title : 'Log in page',condition:false});
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
                        return res.render('login' ,{title : 'log in page'});
                    }
                });
           }else {
            return res.render('signup' , {title : 'sign up page' , exist : true , message : 'this email is already exist'});
           }
        });
    }
    catch(err) {
        console.log('Error:' , err);
        return res.status(500).send('An unexprected error occured.');
    };
});

//log in authantications
routes.post('/check' , (req , res) => {
    try {
        const {entredemail , enteredPassword} = req.body;
        dbconnection.query('SELECT email,password FROM users WHERE email=?;', [entredemail] , async (err , result) => {
           let databaseEmail = result[0].email;
           let hashedPassword = result[0].password;
           let match = await bcrypt.compare(enteredPassword , hashedPassword);
           console.log(match);
           if (databaseEmail === entredemail && match) {
            console.log('data correct...')
            return res.status(401).render('index');
           }
           else {
            console.log('eather email or password not correct');
            return res.render('login' , {title : 'Log in page', condition: true , message : 'eather email or password not correct'});
           }
        });
    }
    catch(error) {
        console.error('Error :', error);
        return res.status(500).send('an Error occured.');
    }
});

module.exports= routes;