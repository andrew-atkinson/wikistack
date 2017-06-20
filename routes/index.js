// Create a router
var express = require('express');
var router = express.Router();

const wikiRouter = require('./wiki');
const userRouter = require('./user');

console.log("This is the wikiRouter: ", wikiRouter);

router.use('/wiki', wikiRouter);

module.exports = router

