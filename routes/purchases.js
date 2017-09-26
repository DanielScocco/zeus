var express = require('express');
var router = express.Router();
var createSidebar = require('./sidebar.js');
var isAuthenticated = require('./isAuthenticated.js');
var Product = require('../models/product');
var Purchase = require('../models/purchase');
var auxFunctions = require('./auxFunctions');

/* GET home page. */
router.get('/', isAuthenticated, function(req, res, next) {
  var sidebar = createSidebar('compras');

  Product.find({companyId:req.user.companyId},function(err, products){
  	if(err) console.log(err);  // log errors	

  	  //get date  	  
      var currentDate = auxFunctions.formatDate(1,new Date());

  	  //create select
  	  var productArray = {};
  	  var productSelect = '<option value="0">Selecione o produto</option>';
  	  for(var i=0;i<products.length;i++){
  	  	if(products[i].isPurchased==1)
  	  		productSelect += '<option value="'+products[i]._id+'">'+products[i].name+'</option>';
  	  	productArray[products[i]._id] = products[i].name;
  	  }

  	  //create table body
  	  Purchase.find({companyId:req.user.companyId},function(err, purchases){
  		if(err) console.log(err);  // log errors	

  		  var tableBody = "";
  		  for(var i=0;i<purchases.length;i++){
  		  	var date = auxFunctions.formatDate(1,purchases[i].date);
  		  	var unitCost = purchases[i].totalCost / purchases[i].quantity;

  		  	tableBody += `<tr>
                            <th scope="row">${date}</th>
                            <td>${productArray[purchases[i].productId]}</td>
                            <td>${purchases[i].supplier}</td>
                            <td>${purchases[i].receiptNumber}</td>
                            <td class="text-center">${purchases[i].quantity}</td>
                            <td class="text-center">R$ ${unitCost.toFixed(2)}</td>
                            <td class="text-center">R$ ${purchases[i].totalCost.toFixed(2)}</td>
                            <td><a href="/savePurchase?d=true&id=${purchases[i]._id}"><i class="fa fa-trash-o"></i></a></td>                           
                          </tr>`;
  		  }

		  var content = `<section class="forms no-padding-bottom"> 
			           			 <div class="container-fluid">
			           			 	<div class="row">		           			 		
						                <div class="col-lg-12">                           
						                  <div class="card">			                   
						                    <div class="card-header d-flex align-items-center">
						                      <h3 class="h4">Cadastrar Compra</h3>
						                    </div>
						                    <div class="card-body">
						                      <form class="form" method="POST" action="/savePurchase">
						                      <div class="form-inline marginbottom20">
						                      	<div class="col-md-3">
						                           <div class="form-group">
						                            <label for="inlineFormInput" class="sr-only">Data</label>
								                    <input name="date" type="date" value="${currentDate}" class="mx-sm-3 form-control min150">	                             
						                           </div>
						                        </div>  	

						                      	<div class="col-md-3">
							                        <div class="form-group">
							                          <select name="productId" class="form-control custom-select">
								                              ${productSelect}
								                       </select> 
							                        </div>
							                    </div>	

						                        <div class="col-md-3">
						                           <div class="form-group">
						                            <label for="inlineFormInput" class="sr-only">Quantidade</label>
								                    <input id="purchasequantity" name="quantity" type="number" placeholder="Quantidade" class="mx-sm-3 form-control min150">	                             
						                           </div>
						                        </div>  

						                        

												 <div class="col-md-3">
						                           <div class="form-group">
						                            <label for="inlineFormInput" class="sr-only">Fornecedor</label>
								                    <input name="supplier" type="text" placeholder="Fornecedor" class="mx-sm-3 form-control min150">	                             
						                           </div>
						                        </div>    
								              </div>
								              <div class="form-inline marginbottom20">

						                        <div class="col-md-3">
						                           <div class="form-group">
						                            <label for="inlineFormInput" class="sr-only">Número da Nota</label>
								                    <input name="receiptNumber" type="text" placeholder="N. da Nota" class="mx-sm-3 form-control min150">	                             
						                           </div>
						                        </div>  					                       

												 <div class="col-md-3">
						                           <div class="form-group">
						                            <label for="inlineFormInput" class="sr-only">Valor Unitário</label>
								                    <input id="unitcost" name="unitcost" type="number" step="0.01" placeholder="Valor Unitário" class="mx-sm-3 form-control min150">	                             
						                           </div>
						                        </div>  

						                         <div class="col-md-3">
						                           <div class="form-group">
						                            <label for="inlineFormInput" class="sr-only">Valor Total</label>
								                    <input id="totalcost" name="totalcost" type="number" step="0.01" placeholder="Valor Total" class="mx-sm-3 form-control min150">	                             
						                           </div>
						                        </div>    
								              </div>
								              <div class="form-inline">
								              	<div class="col">                              
							                        <div class="form-group">
							                          <input type="submit" value="Salvar" class="mx-sm-3 btn btn-primary">
							                        </div>
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
		                  	<div class="card-body">
		                      <table class="table">
		                        <thead>
		                          <tr>
		                          	<th>Data</th>
		                            <th>Produto</th>		                            
		                            <th>Fornecedor</th>
		                            <th>N. Nota</th>
		                            <th class="text-center">Quantidade</th>
		                            <th class="text-center">Valor Unidade</th>
		                            <th class="text-center">Valor Total</th>
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

		  res.render('body', {user:"Tamboré", sidebar:sidebar, header:"Compras",content:content,layout:'main'});
		});
	});
});

module.exports = router;
