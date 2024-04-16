const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();


app.use(express.json());


//view engine 
app.set('view-engin', 'ejs');
app.set('views', __dirname + '/views');



//main route
app.get('/' , (req , res) => {
    res.status(202).render('index');
})


app.listen(3000 , () => {
    console.log('app is running on port 3000');
})  