var express = require('express');
var router = express.Router();

module.exports = function(passport){
	/* GET Register */
	router.get('/', function(req, res, next) {  
	 	var content = `<h3 class="text-danger">${req.flash('message')}</h3>
	 					<form id="register-form" method="POST" action"/register">
	                    <div class="form-group">
	                      <input id="register-username" type="text" name="username" required class="input-material">
	                      <label for="register-username" class="label-material">Username</label>
	                    </div>
	                    <div class="form-group">
	                      <input id="register-email" type="email" name="email" required class="input-material">
	                      <label for="register-email" class="label-material">Email</label>
	                    </div>
	                    <div class="form-group">
	                      <input id="register-passowrd" type="password" name="password" required class="input-material">
	                      <label for="register-passowrd" class="label-material">Password        </label>
	                    </div>
	                    <div class="form-group terms-conditions">
	                      <input id="license" type="checkbox" class="checkbox-template">
	                      <label for="license">Concordo com os Termos de Serviço</label>
	                    </div>
	                    <input id="register" type="submit" value="Criar Conta" class="btn btn-primary">
	                  </form><small>Já tem uma conta? </small><a href="/login" class="signup">Faça o Login</a>`;

	  res.render('login', {content:content,layout:false});
	});

	/* Handle Registration POST */
    router.post('/', passport.authenticate('signup', {
      successRedirect: '/dashboard',
      failureRedirect: '/register',
      failureFlash : true 
    }));

	return router;
}
