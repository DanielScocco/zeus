var express = require('express');
var router = express.Router();

module.exports = function(passport){
	/* GET login. */
	router.get('/', function(req, res, next) {  
	  	var content = `<h3 class="text-danger">${req.flash('message')}</h3>

	  					<form id="login-form" method="POST" action="/login">
	                    <div class="form-group">
	                      <input id="login-username" type="text" name="username" required="" class="input-material">
	                      <label for="login-username" class="label-material">Username</label>
	                    </div>
	                    <div class="form-group">
	                      <input id="login-password" type="password" name="password" required="" class="input-material">
	                      <label for="login-password" class="label-material">Password</label>
	                    </div>
	                    <input id="login" type="submit" value="Login" class="btn btn-primary">
	                    <!-- This should be submit button but I replaced it with <a> for demo purposes-->
	                  </form><a href="#" class="forgot-pass">Esqueceu o Password?</a><br><small>Ainda não tem conta? </small><a href="/register" class="signup">Crie uma</a>`;
	  
	  res.render('login', {content:content,layout:false});
	});

	/* Handle Login POST */
	  router.post('/', passport.authenticate('login', {
	    successRedirect: '/dashboard',
	    failureRedirect: '/login',
	    failureFlash : true 
	  }));

	return router;
}
