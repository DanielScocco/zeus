var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var url = req.originalUrl;
  if(url=="/login"){
  	var content = `<form id="login-form" method="post">
                    <div class="form-group">
                      <input id="login-username" type="text" name="loginUsername" required="" class="input-material">
                      <label for="login-username" class="label-material">Username</label>
                    </div>
                    <div class="form-group">
                      <input id="login-password" type="password" name="loginPassword" required="" class="input-material">
                      <label for="login-password" class="label-material">Password</label>
                    </div><a id="login" href="index.html" class="btn btn-primary">Login</a>
                    <!-- This should be submit button but I replaced it with <a> for demo purposes-->
                  </form><a href="#" class="forgot-pass">Esqueceu o Password?</a><br><small>Ainda não tem conta? </small><a href="/register" class="signup">Crie uma</a>`;
  }
  else if(url=='/register'){
  	var content = `<form id="register-form">
                    <div class="form-group">
                      <input id="register-username" type="text" name="user" required class="input-material">
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
  }
  else{
  	var content = "Página não encontrada.";
  }
  res.render('login', {content:content,layout:false});
});

module.exports = router;
