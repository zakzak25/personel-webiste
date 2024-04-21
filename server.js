const express = require('express');
const app = express();
const dotenv = require('dotenv');
const routes = require('./routes/routes');
const dbconnection = require('./database/db');
dotenv.config();




//servers static file
app.use(express.json());
app.use(express.static('public'));

//mysql connection


dbconnection.connect((err) => {
    if (err) throw err;
    app.listen(process.env.PORT || 4000 , () => {
        console.log('app is running on port 3000');
    });
});

//view engine 
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : false}));
 

//main route
app.use('/' , routes);