const PORT = 3000;

const express = require('express');
const bodyParser = require('body-parser'); // express 4.16+ has bodyParser
const app = express();

// Our app uses ejs as rendering engine
app.set('view engine', 'ejs');

// Enables external CSS 
app.use(express.static('public'));

// Enables body-parser usage
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/bmi.html");
});

app.post('/', (req, res) => {
    let resultList = [];
    let age = Number(req.body.age);
    let height = Number(req.body.height); 
    let weight = Number(req.body.weight);
    resultList.push(age);
    resultList.push(weight);
    resultList.push(height);

    let bmiResult = weight / (Math.pow(height*0.01, 2));

    let bmi = `Your BMI Result is: ${bmiResult.toFixed(2)}.`;
    resultList.push(bmi);

    res.render('bmi', {
        afterAge: resultList[0],
        afterWeight: resultList[1],
        afterHeight: resultList[2],
        calculatedBMI: bmi});
    // res.end();

});

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
