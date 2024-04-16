const express = require('express');
const app = express();


//main route
app.get('/' , (req , res) => {
    res.send('<h1>welcom to my websites</h1>')
})


app.listen(3000 , () => {
    console.log('app is running on port 3000');
})