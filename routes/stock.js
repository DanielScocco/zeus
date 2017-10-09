var express = require('express');
var router = express.Router();
var createSidebar = require('./sidebar.js');
var isAuthenticated = require('./isAuthenticated.js');
var Product = require('../models/product');
var StockEdit = require('../models/stockEdit');
var auxFunctions = require('./auxFunctions');
var CurrentStock = require('../models/currentStock');
var calcStockValue = require('./calcStockValue');

/* GET home page. */
router.get('/', isAuthenticated,function(req, res, next) {
  calcStockValue(req.user.companyId,req.user.storeIds[0],function(err,stockValue){
  	if(err) console.log(err);  // log errors	 
  	  
  	  var totalStockValue = 0;
  	  for(var id in stockValue){
  	  	totalStockValue += stockValue[id][1];
  	  }

	  Product.find({companyId:req.user.companyId},function(err, products){
	  	if(err) console.log(err);  // log errors	 	  

	  	  //create productArray id => name
	  	  var productArray = {};  	  
	  	  for(var i=0;i<products.length;i++){  	
	  	    productArray[products[i]._id] = products[i].name;
	  	  }

	  	  //include adjustments
	  	  StockEdit.find({storeId:req.user.storeIds[0]},function(err, stockEdits){
	  		if(err) console.log(err);  // log errors

	  		var table2Body = "";
	  		for(var i=0;i<stockEdits.length;i++){
	  			var id = stockEdits[i].productId;
			  	var quantity = stockEdits[i].adjustment; 
		  	  	//stock edits table
		  	  	var date = auxFunctions.formatDate(1,stockEdits[i].date);
	  	  	 	table2Body += `<tr>
	                        <th scope="row">${date}</th>
	                        <td class="text-center">${productArray[id]}</td>
	                        <td class="text-center">${quantity}</td>
	                        <td class="text-center">${stockEdits[i].reason}</td>                           
	                        <td><a href="/saveStockEdit?d=true&sid=${stockEdits[i]._id}"><i class="fa fa-remove"></i></a></td>                           
	                      </tr>`;
	  		}
	  	 
	  		CurrentStock.findOne({storeId:req.user.storeIds[0]},function(err, currentStock){
	  			if(err) console.log(err);  // log errors

	  		  var productStock = currentStock.list;

		  	  //create stock table
		  	  var tableBody = "";
		  	  for(var id in productStock){
		  	  	//var date = auxFunctions.formatDate(1,productStock[id][1]);
		  	  	var date = "-";
		  	  	var quantity = productStock[id].toFixed(2);
		  	  	var parts = quantity.split(".");
		  	  	if(parts[1]=='00')
		  	  		quantity = parts[0];
		  	  	tableBody += `<tr>
	                            <th scope="row">${productArray[id]}</th>
	                            <td class="text-center">${quantity}</td>
	                            <td class="text-center">-</td>
	                                                      
	                            <td><a href="/ajusteEstoque?pid=${id}"><i class="fa fa-edit"></i></a></td>                           
	                          </tr>`;
		  	  }


			  var sidebar = createSidebar('estoque');

			  var content = `<section class="tables no-padding-bottom">   
			            <div class="container-fluid">
			              <div class="row">
			                <div class="col-lg-12">
			                  <div class="card">
			                  <div class="card-header d-flex align-items-center">
				                      <h3 class="h4">Estoque Atual (<span class="text-success">Valor: R$${totalStockValue.toFixed(2)}</span>)</h3>
				                    </div>
			                  	<div class="card-body">
			                      <table class="table">
			                        <thead>
			                          <tr>
			                            <th>Produto</th>
			                            <th class="text-center">Quantidade</th>
			                            <th class="text-center">Duração</th>
			                            
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
			                </section>
			               
			                <section class="tables no-padding-top">   
				            <div class="container-fluid">
				              <div class="row">
				                <div class="col-lg-12">
				                  <div class="card">
				                   <div class="card-header d-flex align-items-center">
				                      <h3 class="h4">Ajustes de Estoque</h3>
				                    </div>
				                  	<div class="card-body">
				                      <table class="table">
				                        <thead>
				                          <tr>
				                            <th>Data</th>
				                            <th class="text-center">Produto</th>
				                            <th class="text-center">Ajuste</th>
				                            <th class="text-center">Motivo</th>
				                            <th></th>
				                          </tr>
				                        </thead>
				                        <tbody>
				                          ${table2Body}
				                        </tbody>
				                      </table>
				                    </div>
				                   </div>
				                  </div>
				                  </div>
				                 </div>
				                </section>`;

			  res.render('body', {user:"Tamboré", sidebar:sidebar, header:"Estoque",content:content,layout:'main'});
			 });//currentStock
			});//stockedits	 
	  });//product
	});//calcStockValue
});

module.exports = router;
