var express = require('express');
var router = express.Router();
var createSidebar = require('./sidebar.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  var sidebar = createSidebar('compras');

  var content = `<section class="forms no-padding-bottom"> 
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
			                      <form class="form-inline" method="POST" action="/savePurchase">

			                      
			                      <div class="form-group">
			                      
			                            <select name="account" class="form-control">
			                              <option>Selecione o produto:</option>
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
			                          <label for="inlineFormInput" class="sr-only">Nome</label>
			                          <input id="inlineFormInput" name="name" type="number" placeholder="Fornecedor" class="mx-sm-3 form-control">
			                        </div>	

			                        <div class="form-group">
			                          <label for="inlineFormInput" class="sr-only">Nome</label>
			                          <input id="inlineFormInput" name="name" type="date" placeholder="Data" class="mx-sm-3 form-control">
			                        </div>	
			                        <br>

			                        <div class="form-group">
			                          <label for="inlineFormInput" class="sr-only">Nome</label>
			                          <input id="inlineFormInput" name="name" type="text" placeholder="N. da nota" class="mx-sm-3 form-control">
			                        </div>	

			                        <div class="form-group">
			                          <label for="inlineFormInput" class="sr-only">Nome</label>
			                          <input id="inlineFormInput" name="name" type="number" placeholder="Valor total" class="mx-sm-3 form-control">
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
                            <th>Fornecedor</th>
                            <th>N. Nota</th>
                            <th>Valor Unidade</th>
                            <th>Valor Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">10/09/17</th>
                            <td>Leite</td>
                            <td>100</td>
                            <td>Jussara</td>
                            <td>1728378282727</td>
                            <td>R$5,50</td>
                            <td>R$550,00</td>
                          </tr>
                          <tr>
                            <th scope="row">10/09/17</th>
                            <td>Pistache</td>
                            <td>10</td>
                            <td>PistacheBom</td>
                            <td>17283783327</td>
                            <td>R$65</td>
                            <td>R$650,00</td>
                          </tr>
                          
                        </tbody>
                      </table>
                    </div>
                   </div>
                  </div>
                  </div>
                 </div>
                </section>`;

  res.render('body', {user:"Tamboré", sidebar:sidebar, header:"Compras",content:content,layout:'main'});
});

module.exports = router;
