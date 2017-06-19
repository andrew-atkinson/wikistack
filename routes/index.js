
// 'use strict';
// var tweetBank = require('../tweetBank');
// var client = require('../db');

// Create a router
var express = require('express');
var router = express.Router();

const wikiRouter = require('./wiki');
const userRouter = require('./user');

console.log("This is the wikiRouter: ", wikiRouter);

router.use('/wiki', wikiRouter);

// module.exports = {
//     wikiRouter: wikiRouter,
//     userRouter: userRouter
// }

module.exports = router

