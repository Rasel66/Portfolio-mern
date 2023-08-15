require("dotenv").config()
const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
require ('./db/conn')
const router = require('./routes/router');
const port = process.env.PORT || 6002;

app.use(cors())
app.use(express.json())

//static files access

app.use(express.static(path.join(__dirname,'./client/build')))

app.use(router);

app.get('/',(req, res)=>{
    res.status(201).json('server starts')
})

app.get('*',function(req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`)
})