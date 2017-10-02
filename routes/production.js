var express = require('express');
var router = express.Router();
var createSidebar = require('./sidebar.js');
var isAuthenticated = require('./isAuthenticated.js');
var Recipe = require('../models/recipe');
var Production = require('../models/production');
var auxFunctions = require('./auxFunctions');


/* GET home page. */
router.get('/', isAuthenticated,function(req, res, next) {
  var sidebar = createSidebar('producao');

  Recipe.find({companyId:req.user.companyId},function(err, recipes){
  	if(err) console.log(err);  // log errors	 	 

  	  //create select  	 
  	  var recipeArray = {};
  	  var productSelect = '<option value="0">Selecione a receita</option>';
  	  for(var i=0;i<recipes.length;i++){
  	  	if(recipes[i].isActive==1)
  	  		productSelect += '<option value="'+recipes[i]._id+'">'+recipes[i].name+'</option>';  	
  	  	recipeArray[recipes[i]._id] = recipes[i].name;  	
  	  }

  	  //create table body
  	  Production.find({storeId:req.user.storeIds[0]},function(err, productions){
  		if(err) console.log(err);  // log errors	

  		  var tableBody = "";
  		  for(var i=0;i<productions.length;i++){
  		  	var date = auxFunctions.formatDate(1,productions[i].date);  		  	

  		  	tableBody += `<tr>
                            <th scope="row">${date}</th>
                            <td>${recipeArray[productions[i].recipeId]}</td>
                            <td class="text-center">${productions[i].quantity}</td>                           
                            <td><a href="/saveProduction?d=true&pid=${productions[i]._id}"><i class="fa fa-trash-o"></i></a></td>                           
                          </tr>`;

            }

		  var content = `<section class="forms no-padding-bottom"> 
			           			 <div class="container-fluid">
			           			 	<div class="row">		           			 		
						                <div class="col-lg-12">                           
						                  <div class="card">			                   
						                    <div class="card-header d-flex align-items-center">
						                      <h3 class="h4">Cadastrar Produção</h3>
						                    </div>
						                    <div class="card-body">
						                      <h3 class="text-danger">${req.flash('stockAlert')}</h3>
						                      <form class="form" method="POST" action="/saveProduction">
						                      <div class="form-inline">				

						                      	<div class="col-md-3">
							                        <div class="form-group">
							                          <select name="recipeId" class="form-control custom-select">
								                              ${productSelect}
								                       </select> 
							                        </div>
							                    </div>	

						                        <div class="col-md-3">
						                           <div class="form-group">
						                            <label for="inlineFormInput" class="sr-only">Quantidade</label>
								                    <input id="quantity" name="quantity" type="number" placeholder="Quantidade" class="mx-sm-3 form-control min150">	                             
						                           </div>
						                        </div>              

												
								             
								              	<div class="col">                              
							                        <div class="form-group">
							                          <input type="submit" value="Salvar" class="mx-sm-3 btn btn-primary">
							                        </div>
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
		                  <div class="card-header d-flex align-items-center">
				                      <h3 class="h4">Histórico de Produção</h3>
				                    </div>
		                  	<div class="card-body">
		                      <table class="table">
		                        <thead>
		                          <tr>
		                          	<th>Data</th>
		                            <th>Receita</th>		                            
		                            <th class="text-center">Quantidade</th>		                           	                           
		                            <th></th>
		                          </tr>
		                        </thead>
		                        <tbody>
		                          ${tableBody}	                          
		                        </tbody>
		                      </table>
		                    </div>
		                   </div>
		                  </div>
		                  </div>
		                 </div>
		                </section>`;

		  res.render('body', {user:"Tamboré", sidebar:sidebar, header:"Produção",content:content,layout:'main'});
		});
	});
});

module.exports = router;
