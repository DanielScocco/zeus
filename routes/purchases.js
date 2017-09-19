var express = require('express');
var router = express.Router();
var createSidebar = require('./sidebar.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  var sidebar = createSidebar('compras');

  var content = `<section class="forms"> 
           			 <div class="container-fluid">
           			 	<div class="row">
           			 		<!-- Inline Form-->
			                <div class="col-lg-12">                           
			                  <div class="card">			                   
			                    <div class="card-header d-flex align-items-center">
			                      <h3 class="h4">Cadastrar Novo Produto</h3>
			                    </div>
			                    <div class="card-body">
			                      <form class="form-inline" method="POST" action="/savePurchase">
			                        <div class="form-group">
			                          <label for="inlineFormInput" class="sr-only">Nome</label>
			                          <input id="inlineFormInput" name="name" type="text" placeholder="Nome" class="mx-sm-3 form-control">
			                        </div>			                       
			                        <div class="form-group">
			                          <input type="submit" value="Salvar" class="mx-sm-3 btn btn-primary">
			                        </div>
			                      </form>
			                    </div>
			                  </div>
			                </div>
			            </div>
			            <div class="row">
           			 		<!-- Inline Form-->
			                <div class="col-lg-12">                           
			                  <div class="card">			                   
			                    <div class="card-header d-flex align-items-center">
			                      <h3 class="h4">Inserir Compra</h3>
			                    </div>
			                    <div class="card-body">
			                      <form class="form-inline">
			                        <div class="form-group">
			                          <label for="inlineFormInput" class="sr-only">Nome</label>
			                          <input id="inlineFormInput" type="text" placeholder="Nome" class="mx-sm-3 form-control">
			                        </div>			                       
			                        <div class="form-group">
			                          <input type="submit" value="Salvar" class="mx-sm-3 btn btn-primary">
			                        </div>
			                      </form>
			                    </div>
			                  </div>
			                </div>
			            </div>
			        </div>
			    </section`;

  res.render('body', {user:"Tamboré", sidebar:sidebar, header:"Compras",content:content,layout:'main'});
});

module.exports = router;
