const express = require('express');
const app = express();
const path = require('path');
const readingModel = require('./models/readings')
const { exec, spawn } = require('child_process');
const { timeStamp } = require('console');


let pythonProcess = null;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", async(req, res)=>{
    let allReadings = await readingModel.find().sort({ timestamp: -1 });
    // console.log(allReadings)
    res.render('index', {allReadings})
})

app.get('/start-python', (req, res) => {
    if (pythonProcess) {
        res.send('Python script is already running.');
        return;
    }

    pythonProcess = spawn('python', ['barScanWithText.py']);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Python script exited with code ${code}`);
        pythonProcess = null;
    });

    res.send('Python script started!!');
});

// Define the /stop-python endpoint
app.get('/stop-python', (req, res) => {
    if (pythonProcess) {
        pythonProcess.kill();
        pythonProcess = null;
        res.send('Python script stopped.');
    } else {
        res.send('Python script is not running.');
    }
});

app.listen(3000, function(){
    console.log('App is running....')
})  