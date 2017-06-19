// Create a router
var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next) {
  res.redirect('/');
})

router.post('/', function(req, res, next) {
   // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

 var page = Page.build({
    title: req.body.title,
    content: req.body.content//,
    // urlTitle: urlHelper(req.body.title)
  });

 // function urlHelper(title){
 //  if (!title){
 //    title = req.body.content.slice(0,15);
 //  }
 //  return title.replace(/[^A-Za-z0-9]/g, "_");
 // }

 // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save()
  .then(function(page) {
    // console.log("look here!",page.route);
    res.redirect(page.route)
  })
  .catch(next);
//  page.save().then(res.json({url: page.urlTitle}));
  // -> after save -> res.redirect('/');
});

router.get('/add', function(req, res, next) {
  res.render('addpage');
})

router.get('/:urlTitle', function(req, res, next){

  Page.findOne({
    where:{
      urlTitle: req.params.urlTitle
    }
  }).then(function(foundPage){
    // console.log({foundPage});
    res.render('wikipage', {foundPage});
  }).catch(next);

})

module.exports = router;

// module.exports = {
//     router: router
// }
