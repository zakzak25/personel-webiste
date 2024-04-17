const express = require('express');
const routes = express.Router();


routes.get('/' , (req , res) => {
    res.render('index');
});

//insert new user
routes.post('/newUser' , (req , res) => {
    
})

module.exports= routes;