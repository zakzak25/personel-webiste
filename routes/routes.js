const express = require('express');
const routes = express.Router();



//main page
routes.get('/' , (req , res) => {
    res.render('index');
});

//registration page 
routes.get('/registration' , (req , res) => {
    res.render('signup');
});

//insert new user
// routes.post('/newUser' , (req , res) => {
//     dbconnection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (err, results) => {
//         if (err) throw err;
//         console.log(results);
//     });
// });



//send data from html page to the back end
routes.post('/newUser' , (req , res)=> {
    const data = req.params;
    console.log(data)
})



module.exports= routes;