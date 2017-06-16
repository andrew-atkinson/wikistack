
// Requirements
const express = require('express')
let app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
//const Sequelize = require('sequelize')
const fs = require('fs')
const socketio = require('socket.io')
const path = require('path')
// require models index.js
const models = require('./models')
const makesRouter = require('./routes')

// templating boilerplate setup
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
// where to find the views, caching off
let env = nunjucks.configure('views', { noCache: true });

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

// Routing to index.html
app.get('/', (req,res,next) => {
    res.render('index') // nunjucks knows to look for html
})

// sync: access pages via users
var server;
models.db.sync({force: true}) // drops and re-creates table
.then( () => {
    server = app.listen(1337, () => {
        console.log('listening on port 1337');
    })
})
.catch(console.error);

// // start the server
// var server = app.listen(1337, function(){
//   console.log('listening on port 1337');
// });
var io = socketio.listen(server);

// Re-routes to public version of data
app.use(express.static(path.join(__dirname, '/public')));

// modular routing that uses io inside it
//app.use('/', makesRouter(io));




