
// Create a router
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send("in router.get!!!")
})

router.post('/', function (req, res, next) {
    res.send("in router.post!!!")
})

router.get('/add', function (req, res, next) {
    res.send("in router.get for wiki.add!!!")
})

module.exports = router;

// module.exports = {
//     router: router
// }


