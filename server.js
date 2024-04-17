const express = require('express');
const app = express();
const dotenv = require('dotenv');
const routes = require('./routes/routes');
const mysql = require('mysql');


dotenv.config();




//servers static file
app.use(express.json());
app.use(express.static('public'));

//mysql connection
const dbconnection = mysql.createConnection({
    host:process.env.URL_DATABASE_HOST,
    user:process.env.URL_DATABASE_USER,
    password:process.env.URL_DATABASE_PASSWORD,
    database:process.env.URL_DATABASE_NAME
});

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




