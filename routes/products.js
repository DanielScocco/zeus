var express = require('express');
var router = express.Router();
var createSidebar = require('./sidebar.js');
var isAuthenticated = require('./isAuthenticated.js');
var Product = require('../models/product');

/* GET home page. */
router.get('/', isAuthenticated, function(req, res, next) {	
  var sidebar = createSidebar('produtos');
  
  Product.find({companyId:req.user.companyId},function(err, products){
  	if(err) console.log(err);  // log errors	

  	  //create select
  	  var productArray = {};
  	  var productSelect = '<option value="0">Selecione o produto</option>';
  	  for(var i=0;i<products.length;i++){
  	  	if(products[i].isComposite==0)
  	  		productSelect += '<option value="'+products[i]._id+'">'+products[i].name+'</option>';
  	  	productArray[products[i]._id] = products[i].name;
  	  }

  	  //create products table
  	  var productsList = "";
  	  for(var i=0;i<products.length;i++){
  	  	if(products[i].isRawMaterial==1)
  	  		var raw = "X";
  	  	else
  	  		var raw = "";
  	  	if(products[i].isPurchased==1)
  	  		var purchased = "X";
  	  	else
  	  		var purchased = "";
  	  	if(products[i].isSold==1)
  	  		var sold = "X";
  	  	else
  	  		var sold = "";
  	  	if(products[i].isComposite==1){
  	  		var composition = "";
  	  		for(var j=0;j<products[i].list.length;j++){
  	  			if(j>0)
  	  				composition += ", ";
  	  			composition += productArray[products[i].list[j].id] + " x" + products[i].list[j].quantity;
  	  		}
  	  	}
  	  	else{
  	  		var composition = "";
  	  	}
  	  	productsList += `<tr>
                            <th scope="row">${products[i].name}</th>
                            <td class="text-center">${raw}</td>
                            <td class="text-center">${purchased}</td>
                            <td class="text-center">${sold}</td>
                            <td>${composition}</td>
                            <td><a href="/saveProduct?d=true&id=${products[i]._id}"><i class="fa fa-trash-o"></i></a></td>                           
                          </tr>`;
  	  }
  	 						 

	  var content = `<section class="forms no-padding-bottom"> 
	           			 <div class="container-fluid">
	           			 	<div class="row">
	           			 		<!-- Inline Form-->
				                <div class="col-lg-12">                           
				                  <div class="card">			                   
				                    <div class="card-header d-flex align-items-center">
				                      <h3 class="h4">Cadastrar Produto Simples</h3>
				                    </div>
				                    <div class="card-body">
				                      <form class="form-inline" method="POST" action="/saveProduct">
				                        <div class="form-group">
				                          <label for="inlineFormInput" class="sr-only">Nome</label>
				                          <input id="inlineFormInput" name="productName" type="text" placeholder="Nome" class="mx-sm-3 form-control">
				                        </div>			
				                        <div class="col">
				                            <div class="i-checks">
				                              <input id="checkboxCustom1" type="checkbox" value="1" class="checkbox-template" name="israwmaterial">
				                              <label for="checkboxCustom1">Matéria Prima</label>
				                            </div>	
				                            <div class="i-checks">
				                              <input id="checkboxCustom1" type="checkbox" value="1" class="checkbox-template" name="ispurchased">
				                              <label for="checkboxCustom1">Comprado</label>
				                            </div>	
				                            <div class="i-checks">
				                              <input id="checkboxCustom1" type="checkbox" value="1" class="checkbox-template" name="issold">
				                              <label for="checkboxCustom1">Vendido</label>
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
				            <div class="row">
	           			 		<!-- Inline Form-->
				                <div class="col-lg-12">                           
				                  <div class="card">			                   
				                    <div class="card-header d-flex align-items-center">
				                      <h3 class="h4">Cadastrar Produto Composto</h3>
				                    </div>
				                    <div class="card-body">
				                      <form class="form" method="POST" action="/saveProduct">
				                      <div class="form-inline marginbottom20">
				                        <div class="col-me-3">
					                        <div class="form-group">
					                          <label for="inlineFormInput" class="sr-only">Nome</label>
					                          <input id="inlineFormInput" name="productName" type="text" placeholder="Nome" class="mx-sm-3 form-control">
					                        </div>		
					                    </div>	
					                    <div class="col">
				                            <div class="i-checks">
				                              <input id="checkboxCustom1" type="checkbox" value="1" class="checkbox-template" name="israwmaterial">
				                              <label for="checkboxCustom1">Matéria Prima</label>
				                            </div>	
				                            <div class="i-checks">
				                              <input id="checkboxCustom1" type="checkbox" value="1" class="checkbox-template" name="ispurchased">
				                              <label for="checkboxCustom1">Comprado</label>
				                            </div>	
				                            <div class="i-checks">
				                              <input id="checkboxCustom1" type="checkbox" value="1" class="checkbox-template" name="issold">
				                              <label for="checkboxCustom1">Vendido</label>
				                            </div>				                             
				                        </div>  
				                        <div class="col">
				                            <button onClick="addProductField()" type="button" class="mx-sm-3 btn btn-success"><i class="fa fa-plus"></i> Adicionar sub-produto</button>
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
							                          <input id="inlineFormInput" name="subproduct1quantity" type="number" placeholder="Quantidade" class="mx-sm-3 form-control min150">
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
							                          <input id="inlineFormInput" name="subproduct2quantity" type="number" placeholder="Quantidade" class="mx-sm-3 form-control min150">
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
							                          <input id="inlineFormInput" name="subproduct3quantity" type="number" placeholder="Quantidade" class="mx-sm-3 form-control min150">
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
							                          <input id="inlineFormInput" name="subproduct4quantity" type="number" placeholder="Quantidade" class="mx-sm-3 form-control min150">
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
							                          <input id="inlineFormInput" name="subproduct5quantity" type="number" placeholder="Quantidade" class="mx-sm-3 form-control min150">
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
				<section class="tables no-padding-top">   
	            <div class="container-fluid">
	              <div class="row">
	                <div class="col-lg-12">
	                  <div class="card">
	                  <div class="card-header d-flex align-items-center">
				                      <h3 class="h4">Lista de Produtos</h3>
				                    </div>
	                  	<div class="card-body">
	                      <table class="table">
	                        <thead>
	                          <tr>
	                          	<th>Nome</th>
	                            <th class="text-center">Matéria Prima</th>
	                            <th class="text-center">Comprado</th>
	                            <th class="text-center">Vendido</th>
	                            <th>Composição</th>	
	                            <th></th>	                           
	                          </tr>
	                        </thead>
	                        <tbody>	                       
	                          ${productsList}                          
	                        </tbody>
	                      </table>
	                    </div>
	                   </div>
	                  </div>
	                  </div>
	                 </div>
	                </section>`;

	  res.render('body', {user:"Tamboré", sidebar:sidebar, header:"Produtos",content:content,layout:'main'});
	});
});

module.exports = router;
