const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
} ).then(()=> {
    console.log('Connected to Mongo DB')
}).catch((err)=> {
    console.log('ERROR MONGO' + err);
});


app.use('/', (req, res)=> {
    console.log('This is main url');
});
app.listen(5000, ()=> {
    console.log('BACKEND IS RUNNING');
});