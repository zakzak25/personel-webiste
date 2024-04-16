const express = require('express');
const app = express();
const dotenv = require('dotenv');
const routes = require('./routes/routes');

dotenv.config();




//servers static file
app.use(express.json());
app.set(express.static('public'));



//view engine 
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : false}));


//main route
app.use('/' , routes);


app.listen(3000 , () => {
    console.log('app is running on port 3000');
});

