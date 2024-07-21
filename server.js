// Dependencies
const express = require ('express')
const path = require('path');
const fs = require('fs');

// Initializing express.js
const PORT = 3001;
const app = express();

// middleware
app.use(express.static(__dirname));


app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
  );


// Setup data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Require routes file
require('./routes/routes')(app);
