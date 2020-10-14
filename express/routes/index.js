var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.handlebars');
});

router.get('/contact', function(req, res, next) {
  res.render('contacts.handlebars');
});

router.get('/about', function(req, res, next) {
  res.render('about.handlebars');
});

router.get('/services', function(req, res, next) {
  res.render('services.handlebars');
});

router.get('/projects', function(req, res, next) {
  res.render('project.handlebars');
});

router.get('/career', function(req, res, next) {
  res.render('career.handlebars');
});

router.get('/faq', function(req, res, next) {
  res.render('faq.handlebars');
});

router.get('/team', function(req, res, next) {
  res.render('team.handlebars');
});

router.get('/testimonials', function(req, res, next) {
  res.render('testimonial.handlebars');
});




module.exports = router;
