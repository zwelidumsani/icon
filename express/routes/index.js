var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	 req.session.currentUrl = "/";
     var quoteSuccess = req.flash("email_success")[0];
     var quoteError = req.flash("email_error")[0];
     res.render('index.handlebars', { quoteError : quoteError, quoteSuccess: quoteSuccess});
});

router.get('/contact', function(req, res, next) {
   req.session.currentUrl = "/contact";
   var emailSuccess = req.flash("email_success")[0];
   var emailError = req.flash("email_error")[0];	
   res.render('contacts.handlebars', { emailError: emailError, emailSuccess: emailSuccess});
});

router.get('/about', function(req, res, next) {
	 req.session.currentUrl = "/about";
     var NewletterEmailSuccess = req.flash("email_success")[0];
     var NewletterEmailError = req.flash("email_error")[0]
     res.render('about.handlebars',{ NewletterEmailError : NewletterEmailError , NewletterEmailSuccess: NewletterEmailSuccess});
});


router.get('/projects', function(req, res, next) {
     req.session.currentUrl = "/projects";
     var ProjectEmailSuccess = req.flash("email_success")[0];
     var ProjectEmailError = req.flash("email_error")[0];
     res.render('project.handlebars', { ProjectEmailError : ProjectEmailError , ProjectEmailSuccess: ProjectEmailSuccess});
});

router.get('/career', function(req, res, next) {
  res.render('career.handlebars');
});

router.get('/services', function(req, res, next) {
     res.render('civil.handlebars');
});

router.get('/mech-eng', function(req, res, next) {
     res.render('mech.handlebars');
});

router.get('/gen-building', function(req, res, next) {
     res.render('building.handlebars');
});

router.get('/earthworks', function(req, res, next) {
     res.render('earthworks.handlebars');
});


router.get('/faq', function(req, res, next) {
     req.session.currentUrl = "/faq";
	 var FaqEmailSuccess = req.flash("email_success")[0];
     var FaqEmailError = req.flash("email_error")[0];
     res.render('faq.handlebars', { FaqEmailError : FaqEmailError , FaqEmailSuccess: FaqEmailSuccess});
});

router.get('/team', function(req, res, next) {
	 req.session.currentUrl = "/team";
	 var TeamEmailSuccess = req.flash("email_success")[0];
     var TeamEmailError = req.flash("email_error")[0];
     res.render('team.handlebars', { TeamEmailError : TeamEmailError , TeamEmailSuccess: TeamEmailSuccess});
});

router.get('/testimonials', function(req, res, next) {
  res.render('testimonial.handlebars');
});

router.post('/email', function(req, res, next){
	var transporter = nodemailer.createTransport({
	 service: 'Gmail',
	    auth: {
		     user: 'eswatiniherbalnutrition@gmail.com',
		     pass: 'FANAdumsani@1989367'
		}
	});
	
    const mailOptions = {
         from: req.body.email, // sender address
         to: 'eswatiniherbalnutrition@gmail.com', // list of receivers
         subject: req.body.subject, // Subject line
         html:'<p>'+'NAME:- '+req.body.name+'<br>'+'EMAIL:- '+req.body.email+'<br>'+'CELL:- '+req.body.phone+'<br>'+'MESSAGE:- '+req.body.message+'<br>'+'SERVICE:- '+req.body.service+'</p>'// plain text body
    };

	transporter.sendMail(mailOptions, function (err, info) {
		if(err){ 
		     console.log("Error sending email", err.message);
		     req.flash("email_error", "Something went wrong");	
			 var redirectUrl = req.session.currentUrl;
			 req.session.currentUrl = null;
			 return res.redirect(redirectUrl); 
		}else{
		     console.log("Email has been sent");
		     req.flash("email_success", "Email sent successfully");			 
		     console.log(info);
		     var redirectUrl = req.session.currentUrl;
			 req.session.currentUrl = null;
			 return res.redirect(redirectUrl);
		}
    });
}); 




module.exports = router;
