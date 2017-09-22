var express = require('express');
var router = express.Router();
var createSidebar = require('./sidebar.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  var sidebar = createSidebar('vendas');

  var content = `<section class="forms no-padding-bottom"> 
           			 <div class="container-fluid">
			            <div class="row">
           			 		<!-- Inline Form-->
			                <div class="col-lg-12">                           
			                  <div class="card">			                   
			                    <div class="card-header d-flex align-items-center">
			                      <h3 class="h4">Lanças Vendas</h3>
			                    </div>
			                    <div class="card-body">
			                      <form class="form-inline" method="POST" action="/savePurchase">
			                      
			                      
			                   
			                          
			                       <div class="form-group">
			                          <label for="inlineFormInput" class="sr-only">Nome</label>
			                          <input id="inlineFormInput" name="name" type="date" placeholder="Data" class="mx-sm-3 form-control">
			                        </div>	
			                        <div class="form-group">
			                          <label for="inlineFormInput" class="sr-only">Nome</label>
			                          <input id="inlineFormInput" name="name" type="number" placeholder="Valor" class="mx-sm-3 form-control">
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
                            <th>Valor</th>
                            
                            
                            
                          </tr>
                        </thead>

                        <tr>
                           <th scope="row">10/09/17</th>
                           <td>R$ 6500,50</td>
                        </tr>
                         <tr>
                           <th scope="row">11/09/17</th>
                           <td>R$ 7300,50</td>
                        </tr>
                         <tr>
                           <th scope="row">12/09/17</th>
                           <td>R$ 5300,00</td>
                        </tr>
                      
                      </table>
                    </div>
                   </div>
                  </div>
                  </div>
                 </div>
                </section>`;

  res.render('body', {user:"Tamboré", sidebar:sidebar, header:"Vendas",content:content,layout:'main'});
});

module.exports = router;
