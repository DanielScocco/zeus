var express = require('express');
var router = express.Router();
var createSidebar = require('./sidebar.js');
var isAuthenticated = require('./isAuthenticated.js');
var Product = require('../models/product');
var Sale = require('../models/sale');
var auxFunctions = require('./auxFunctions');

/* GET home page. */
router.get('/', isAuthenticated,function(req, res, next) {
  var sidebar = createSidebar('vendas');

  Product.find({companyId:req.user.companyId},function(err, products){
  	if(err) console.log(err);  // log errors	

  	  //get date  	  
      var currentDate = auxFunctions.formatDate(2,new Date());

  	  //create select
  	  var productArray = {};
  	  var productPrices = "";
  	  var productSelect = '<option value="0">Selecione o produto</option>';
  	  for(var i=0;i<products.length;i++){
  	  	if(products[i].isSold==1){
  	  		productSelect += '<option value="'+products[i]._id+'">'+products[i].name+'</option>';
  	  		if(i>0)
  	  			productPrices += ";";
  	  		productPrices += products[i]._id+"-"+products[i].price;
  	  	}
  	  	productArray[products[i]._id] = products[i].name;
  	  }

  	  //create table body
  	  Sale.find({storeId:req.user.storeIds[0]},function(err, sales){
  		if(err) console.log(err);  // log errors	

  		  var tableBody = "";
  		  for(var i=0;i<sales.length;i++){
  		  	var date = auxFunctions.formatDate(1,sales[i].date);
  		  	var unitCost = sales[i].totalValue / sales[i].quantity;

  		  	tableBody += `<tr>
                            <th scope="row">${date}</th>
                            <td>${productArray[sales[i].productId]}</td>                            
                            <td class="text-center">${sales[i].quantity}</td>
                            <td class="text-center">R$ ${unitCost.toFixed(2)}</td>
                            <td class="text-center">R$ ${sales[i].totalValue.toFixed(2)}</td>
                            <td><a href="/saveSale?d=true&sid=${sales[i]._id}"><i class="fa fa-trash-o"></i></a></td>                           
                          </tr>`;
  		  }

		  var content = `<section class="forms no-padding-bottom"> 
			           			 <div class="container-fluid">
			           			 	<div class="row">		           			 		
						                <div class="col-lg-12">                           
						                  <div class="card">			                   
						                    <div class="card-header d-flex align-items-center">
						                      <h3 class="h4">Cadastrar Venda</h3>
						                    </div>
						                    <div class="card-body">
						                    	<h3 class="text-danger">${req.flash('saleAlert')}</h3>
						                      <form class="form" method="POST" action="/saveSale">
						                      <div class="form-inline marginbottom20">
						                      	<div class="col-md-3">
						                           <div class="form-group">
						                            <label for="inlineFormInput" class="sr-only">Data</label>
								                    <input name="date" type="date" value="${currentDate}" class="mx-sm-3 form-control min150">	                             
						                           </div>
						                        </div>  	

						                      	<div class="col-md-3">
							                        <div class="form-group">
							                          <select name="productId" id="saleProductId" class="form-control custom-select">
								                              ${productSelect}
								                       </select> 
							                        </div>
							                    </div>	

							                     <div class="col-md-3">
						                           <div class="form-group">
						                            <label for="inlineFormInput" class="sr-only">Preço</label>
								                    <input name="price" type="number" step="0.01" placeholder="Preço" class="mx-sm-3 form-control min150">	                             
						                           </div>
						                        </div>		
												
								              </div>
								              <div class="form-inline marginbottom20">					                         					                       
  												<div class="col-md-3">
						                           <div class="form-group">
						                            <label for="inlineFormInput" class="sr-only">Quantidade</label>
								                    <input id="saleQuantity" name="quantity" type="number" placeholder="Quantidade" class="mx-sm-3 form-control min150">	                             
						                           </div>
						                        </div>  

						                         <div class="col-md-3">
						                           <div class="form-group">
						                            <label for="inlineFormInput" class="sr-only">Valor Total</label>
								                    <input id="saleTotalCost" name="saleTotalCost" type="number" step="0.01" placeholder="Valor Total" class="mx-sm-3 form-control min150">	                             
						                           </div>
						                        </div>    
						                        <input type="hidden" name="productPrices" id="productPrices" value="${productPrices}">
								              
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
		                  <div class="card-header d-flex align-items-center">
				                      <h3 class="h4">Histórico de Vendas</h3>
				                    </div>
		                  	<div class="card-body">
		                      <table class="table">
		                        <thead>
		                          <tr>
		                          	<th>Data</th>
		                            <th>Produto</th>      
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

		  res.render('body', {user:"Tamboré", sidebar:sidebar, header:"Vendas",content:content,layout:'main'});
		});
	});
});

module.exports = router;
