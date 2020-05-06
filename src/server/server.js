const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();

const textAnalyzer = require("./module.js")

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("dist"));

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
})

app.get("/", (req, res) => {
    res.sendFile("dist/index.html")
});

app.post("/analyse", (req, res) => {
    const text = req.body.text;

    textAnalyzer.sentimentAnalysis(text, (analysisResult) => res.json(analysisResult));
});