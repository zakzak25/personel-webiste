const express = require('express');
const routes = express.Router();


routes.get('/' , (req , res) => {
    res.render('index');
});

routes.get('/registration' , (req , res) => {
    res.render('signup');
});

//insert new user
routes.post('/newUser' , (req , res) => {
    dbconnection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (err, results) => {
        if (err) throw err;
        console.log(results);
    });
});

module.exports= routes;