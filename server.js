const express = require('express');
const path = require('path');
// import api routes
const apiRoutes = require('./api'); 

const app = express();
const PORT = process.env.PORT || 3001;
// Middleware for parsing json and urlencoded from data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Static files from public
app.use(express.static(path.join(__dirname, 'public')));
// use api routes for requests
app.use('/api', apiRoutes); 
// route to server index.html
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
// route to server notes.html
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));
// start the server 
app.listen(PORT, () => console.log(`App listening on PORT: http://localhost:${PORT}`));
