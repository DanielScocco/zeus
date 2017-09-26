var express = require('express');
var router = express.Router();
var createSidebar = require('./sidebar.js');
var isAuthenticated = require('./isAuthenticated.js');

/* GET home page. */
router.get('/', isAuthenticated,function(req, res, next) {
  var sidebar = createSidebar('producao');

  var content = `<section class="forms no-padding-bottom"> 
           			 <div class="container-fluid">
			            <div class="row">
           			 		<!-- Inline Form-->
			                <div class="col-lg-12">                           
			                  <div class="card">			                   
			                    <div class="card-header d-flex align-items-center">
			                      <h3 class="h4">Cadastrar Produção</h3>
			                    </div>
			                    <div class="card-body">
			                      <form class="form-inline" method="POST" action="/savePurchase">
			                      
			                      
			                      <div class="form-group">
			                      
			                            <select name="account" class="form-control">
			                              <option>Cuba de Pistache</option>
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
                          	<th>Data</th>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            
                            
                          </tr>
                        </thead>

                        <tr>
                            <th scope="row">10/09/17</th>
                            <td>Cuba de Pistache</td>
                            <td>2</td>
                           
                          </tr>
                      
                      </table>
                    </div>
                   </div>
                  </div>
                  </div>
                 </div>
                </section>`;

  res.render('body', {user:"Tamboré", sidebar:sidebar, header:"Produção",content:content,layout:'main'});
});

module.exports = router;
