var express = require('express');
var router = express.Router();
var createSidebar = require('./sidebar.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  var sidebar = createSidebar('receitas');

  var content = `<section class="forms no-padding-bottom"> 
           			 <div class="container-fluid">
			            <div class="row">
           			 		<!-- Inline Form-->
			                <div class="col-lg-12">                           
			                  <div class="card">			                   
			                    <div class="card-header d-flex align-items-center">
			                      <h3 class="h4">Nova Receita</h3>
			                    </div>
			                    <div class="card-body">
			                      <form class="form-inline" method="POST" action="/savePurchase">
			                      <div class="form-group">
			                          <label for="inlineFormInput" class="sr-only">Nome</label>
			                          <input id="inlineFormInput" name="name" type="text" placeholder="Nome" class="mx-sm-3 form-control">
			                        </div>	
			                      
			                      <div class="form-group">
			                      
			                            <select name="account" class="form-control">
			                              <option>Produto 1</option>
			                              <option>option 2</option>
			                              <option>option 3</option>
			                              <option>option 4</option>
			                            </select>
			                       </div>
			                          
			                       <div class="form-group">
			                          <label for="inlineFormInput" class="sr-only">Nome</label>
			                          <input id="inlineFormInput" name="name" type="number" placeholder="Quantidade" class="mx-sm-3 form-control">
			                        </div>	

			                         <div class="form-group">
			                      
			                            <select name="account" class="form-control">
			                              <option>Produto 2</option>
			                              <option>option 2</option>
			                              <option>option 3</option>
			                              <option>option 4</option>
			                            </select>
			                       </div>
			                          
			                       <div class="form-group">
			                          <label for="inlineFormInput" class="sr-only">Nome</label>
			                          <input id="inlineFormInput" name="name" type="number" placeholder="Quantidade" class="mx-sm-3 form-control">
			                        </div>	

			                         <div class="form-group">
			                      
			                            <select name="account" class="form-control">
			                              <option>Produto 3</option>
			                              <option>option 2</option>
			                              <option>option 3</option>
			                              <option>option 4</option>
			                            </select>
			                       </div>
			                          
			                       <div class="form-group">
			                          <label for="inlineFormInput" class="sr-only">Nome</label>
			                          <input id="inlineFormInput" name="name" type="number" placeholder="Quantidade" class="mx-sm-3 form-control">
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
			    </section>
			<section class="tables no-padding-top">   
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-12">
                  <div class="card">
                  	<div class="card-body">
                      <table class="table">
                        <thead>
                          <tr>
                          	<th>Cuba de Pistache</th>
                            <th>5x Leite</th>
                            <th>1x Pistache</th>
                            <th>0.5x Acucar</th>
                            <th>2x Creme de Leite</th>
                            <th>1x Colorante</th>
                            
                          </tr>
                        </thead>
                      
                      </table>
                    </div>
                   </div>
                  </div>
                  </div>
                 </div>
                </section>`;

  res.render('body', {user:"Tamboré", sidebar:sidebar, header:"Receitas",content:content,layout:'main'});
});

module.exports = router;
