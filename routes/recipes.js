var express = require('express');
var router = express.Router();
var createSidebar = require('./sidebar.js');
var isAuthenticated = require('./isAuthenticated.js');
var Product = require('../models/product');
var Recipe = require('../models/recipe');

/* GET home page. */
router.get('/', isAuthenticated,function(req, res, next) {
  var sidebar = createSidebar('receitas');

  Product.find({companyId:req.user.companyId},function(err, products){
  	  if(err) console.log(err);  // log errors	

  	  //create select
  	  var productArray = {};
  	  var productSelect = '<option value="0">Selecione o produto</option>';
  	  for(var i=0;i<products.length;i++){
  	  	if(products[i].isRawMaterial==0)
  	  		productSelect += '<option value="'+products[i]._id+'">'+products[i].name+'</option>';
  	  	productArray[products[i]._id] = products[i].name;
  	  }

  	  Recipe.find({companyId:req.user.companyId},function(err, recipes){
  	  	if(err) console.log(err);  // log errors	

	  	  var recipesList = "";

	  	  for(var i=0;i<recipes.length;i++){	  	  	  
	  	  	  var recipeItems = '';
	  	  	  for(var j=0;j<recipes[i].list.length;j++){	  	  	  	
	  	  	  	if(j>0)
	  	  	  		recipeItems += '<br>';
	  	  	  	recipeItems += '<label class="form-control-label">'+productArray[recipes[i].list[j].id]+' x '+recipes[i].list[j].quantity+'</label>';
	  	  	  }  	  	
	  	  	  if(i%4==0)
	  	  	  	recipesList += '<div class="row">';
		  	  recipesList += `<div class="col-lg-3">
				                  <div class="card">  
				                    <div class="card-header d-flex align-items-center">
				                      <h3 class="h4">${recipes[i].name}</h3><div style="margin-left:60%;"><a href="/saveRecipe?d=true&rid=${recipes[i]._id}"><i class="fa fa-trash-o"></i></a></div>
				                    </div>				                        
				                    <div class="card-body"> 
				                        <div class="form-group">
				                        	${recipeItems}				                        	
				                       	 </div>
				                    </div>				                   
				                  </div>
				                </div>`;
				if((i+1)%4==0){
					recipesList += '</div>';
				}
			}
	  
		  var content = `<section class="forms no-padding-bottom"> 
		           			 <div class="container-fluid">
					            <div class="row">
			           			 		<!-- Inline Form-->
						                <div class="col-lg-12">                           
						                  <div class="card">			                   
						                    <div class="card-header d-flex align-items-center">
						                      <h3 class="h4">Cadastrar Nova Receita</h3>
						                    </div>
						                    <div class="card-body">
						                      <form class="form" method="POST" action="/saveRecipe">
						                      <div class="form-inline marginbottom20">
						                        <div class="col-me-3">
							                        <div class="form-group">
							                          <label for="inlineFormInput" class="sr-only">Nome</label>
							                          <input id="inlineFormInput" name="name" type="text" placeholder="Nome" class="mx-sm-3 form-control">
							                        </div>		
							                    </div>							                 
						                        <div class="col">
						                            <button onClick="addProductField()" type="button" class="mx-sm-3 btn btn-success"><i class="fa fa-plus"></i> Adicionar produto</button>
						                        </div>   				                       
						                       </div>	
						                       <div class="hidden" id="product1row">
							                       <div class="form-inline">
								                       <div class="col-md-3">
								                          <div class="form-group">
								                           <select name="subproduct1id" class="form-control custom-select">
								                              ${productSelect}
								                            </select> 
								                            </div>
								                        </div>  
								                        <div class="col-md-2">
								                           <div class="form-group">
									                          <label for="inlineFormInput" class="sr-only">Quantidade</label>
									                          <input id="inlineFormInput" step="0.01" name="subproduct1quantity" type="number" placeholder="Quantidade" class="mx-sm-3 form-control min150">
									                        </div>
								                        </div>  
							                        </div>
							                    </div>
							                    <div class="hidden" id="product2row">
							                        <div class="form-inline">
								                        <div class="col-md-3">
								                           <select name="subproduct2id" class="form-control custom-select">
								                              ${productSelect}
								                            </select> 
								                        </div>  
								                        <div class="col-md-2">
								                           <div class="form-group">
									                          <label for="inlineFormInput" class="sr-only">Quantidade</label>
									                          <input id="inlineFormInput" step="0.01" name="subproduct2quantity" type="number" placeholder="Quantidade" class="mx-sm-3 form-control min150">
									                        </div>
								                        </div> 
								                    </div>       
								                </div> 
								                <div class="hidden" id="product3row">
							                        <div class="form-inline">
								                        <div class="col-md-3">
								                           <select name="subproduct3id" class="form-control custom-select">
								                              ${productSelect}
								                            </select> 
								                        </div>  
								                        <div class="col-md-2">
								                           <div class="form-group">
									                          <label for="inlineFormInput" class="sr-only">Quantidade</label>
									                          <input id="inlineFormInput" step="0.01" name="subproduct3quantity" type="number" placeholder="Quantidade" class="mx-sm-3 form-control min150">
									                        </div>
								                        </div> 
								                    </div>       
								                </div>     
								                <div class="hidden" id="product4row">
							                        <div class="form-inline">
								                        <div class="col-md-3">
								                           <select name="subproduct4id" class="form-control custom-select">
								                              ${productSelect}
								                            </select> 
								                        </div>  
								                        <div class="col-md-2">
								                           <div class="form-group">
									                          <label for="inlineFormInput" class="sr-only">Quantidade</label>
									                          <input id="inlineFormInput" step="0.01" name="subproduct4quantity" type="number" placeholder="Quantidade" class="mx-sm-3 form-control min150">
									                        </div>
								                        </div> 
								                    </div>       
								                </div>     
								                <div class="hidden" id="product5row">
							                        <div class="form-inline">
								                        <div class="col-md-3">
								                           <select name="subproduct5id" class="form-control custom-select">
								                              ${productSelect}
								                            </select> 
								                        </div>  
								                        <div class="col-md-2">
								                           <div class="form-group">
									                          <label for="inlineFormInput" class="sr-only">Quantidade</label>
									                          <input id="inlineFormInput" step="0.01" name="subproduct5quantity" type="number" placeholder="Quantidade" class="mx-sm-3 form-control min150">
									                        </div>
								                        </div> 
								                    </div>       
								                </div> 
								                <div class="hidden" id="product6row">
							                        <div class="form-inline">
								                        <div class="col-md-3">
								                           <select name="subproduct6id" class="form-control custom-select">
								                              ${productSelect}
								                            </select> 
								                        </div>  
								                        <div class="col-md-2">
								                           <div class="form-group">
									                          <label for="inlineFormInput" class="sr-only">Quantidade</label>
									                          <input id="inlineFormInput" step="0.01" name="subproduct6quantity" type="number" placeholder="Quantidade" class="mx-sm-3 form-control min150">
									                        </div>
								                        </div> 
								                    </div>       
								                </div>          
								                <div class="hidden" id="product7row">
							                        <div class="form-inline">
								                        <div class="col-md-3">
								                           <select name="subproduct7id" class="form-control custom-select">
								                              ${productSelect}
								                            </select> 
								                        </div>  
								                        <div class="col-md-2">
								                           <div class="form-group">
									                          <label for="inlineFormInput" class="sr-only">Quantidade</label>
									                          <input id="inlineFormInput" step="0.01" name="subproduct7quantity" type="number" placeholder="Quantidade" class="mx-sm-3 form-control min150">
									                        </div>
								                        </div> 
								                    </div>       
								                </div>   
								                <div class="hidden" id="product8row">
							                        <div class="form-inline">
								                        <div class="col-md-3">
								                           <select name="subproduct8id" class="form-control custom-select">
								                              ${productSelect}
								                            </select> 
								                        </div>  
								                        <div class="col-md-2">
								                           <div class="form-group">
									                          <label for="inlineFormInput" class="sr-only">Quantidade</label>
									                          <input id="inlineFormInput" step="0.01" name="subproduct8quantity" type="number" placeholder="Quantidade" class="mx-sm-3 form-control min150">
									                        </div>
								                        </div> 
								                    </div>       
								                </div>        
						                        <div class="form-group">
						                          <input type="submit" value="Salvar" class="mx-sm-3 btn btn-primary">
						                        </div>
						                        <input type="hidden" value="0" name="numberOfProducts" id="numberOfProducts">
						                        <input type="hidden" value="1" name="isComposite">
						                      </form>
						                    </div>
						                  </div>
						                </div>
						            </div>
					        </div>
					    </section>
					<section class="forms no-padding-top">
			            <div class="container-fluid">
			              ${recipesList}
		                </div>
		              </section>`;

		  res.render('body', {user:"Tamboré", sidebar:sidebar, header:"Receitas",content:content,layout:'main'});
		});
	});
});

module.exports = router;
