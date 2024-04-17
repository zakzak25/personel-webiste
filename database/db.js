const mysql = require('mysql');
require('dotenv').config();

const dbconnection = mysql.createConnection({
    host:process.env.URL_DATABASE_HOST,
    user:process.env.URL_DATABASE_USER,
    password:process.env.URL_DATABASE_PASSWORD,
    database:process.env.URL_DATABASE_NAME
});

module.exports=dbconnection;