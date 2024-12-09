const express = require('express');
const app = express();
const path = require('path');
const readingModel = require('./models/readings')

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", async(req, res)=>{
    let allReadings = await readingModel.find();
    // console.log(allReadings)
    res.render('index', {allReadings})
})


app.listen(3000, function(){
    console.log('App is running....')
})  