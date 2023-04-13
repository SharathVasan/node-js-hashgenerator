const express = require("express");
const app = express();

const bodyPareser = require("body-parser");
const cors = require("cors");

app.use(bodyPareser.urlencoded({ extended: false }));
app.use(bodyPareser.json());
app.use(cors());

module.exports = app;
