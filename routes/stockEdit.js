var express = require('express');
var router = express.Router();
var createSidebar = require('./sidebar.js');
var isAuthenticated = require('./isAuthenticated.js');
var Product = require('../models/product');
var StockEditReason = require('../models/stockEditReason');
var auxFunctions = require('./auxFunctions');

/* GET home page. */
router.get('/', isAuthenticated,function(req, res, next) {
  var productId = req.query['pid'];
  
  Product.findById(productId,function(err, product){
  	  if(err) console.log(err);  // log errors	 	
  	  var name = product.name; 

  	  StockEditReason.find({companyId:req.user.companyId},function(err, reasons){
  	    if(err) console.log(err);  // log errors	 	  


	  	  var reasonSelect = "";
	  	  for(var i=0;i<reasons.length;i++){	  	  	
	  	  		reasonSelect += '<option value="'+reasons[i].reason+'">'+reasons[i].reason+'</option>';	  	  	
	  	  }

		  var sidebar = createSidebar('');

		  var content = `<section class="forms">
					            <div class="container-fluid">
					              <div class="row">
					                <!-- Basic Form-->
					                <div class="col-lg-6">
					                  <div class="card">              
					                    <div class="card-header d-flex align-items-center">
					                      <h3 class="h4">Criar Novo Motivo</h3>
					                    </div>
					                    <div class="card-body">                    
					                      <form method="POST" action="/saveStockEdit">
					                        <div class="form-group">
					                         <div class="row">
					                          <div class="col">
					                           <div class="form-group">
					                          <label class="form-control-label">Nome</label>
					                          <input type="text" name="reason" class="form-control">
					                          </div> 
					                          </div> 
					                          </div>   
					                        </div>                      
					                       <input type="hidden" name="pid" value="${productId}">
					                       <input type="hidden" name="newReason" value="true">
					                        <div class="form-group">       
					                          <input type="submit" value="Salvar" class="btn btn-primary">
					                        </div>
					                      </form>
					                    </div>
					                  </div>                  
					                </div>
					               
					                <!-- Basic Form-->
					                <div class="col-lg-6">
					                  <div class="card">              
					                    <div class="card-header d-flex align-items-center">
					                      <h3 class="h4">Ajustar Estoque de: <span class="text-danger">${name}</span></h3>
					                    </div>
					                    <div class="card-body">                    
					                      <form method="POST" action="/saveStockEdit">
					                        <div class="form-group">
					                                <div class="row">
					                                         <div class="col">
					                                          <div class="form-group">
					                                            <label class="form-control-label">Motivo</label>
					                                            <select name="reason" class="form-control custom-select">
					                                             ${reasonSelect}                                 
					                                             </select>
					                                          </div> 
					                                           </div> 
					                                       <div class="col">
						                                       	 <div class="form-group">
										                          <label class="form-control-label">Ajuste (ex. 20 ou -20)</label>
										                          <input type="number" name="adjustment" class="form-control">
										                        </div>   		                                                                                      
					                                        </div>  
					                                  </div>				                                  
					                        </div>				
					                        <input type="hidden" name="pid" value="${productId}">                        
					                        <div class="form-group">       
					                          <input type="submit" value="Salvar" class="btn btn-primary">
					                        </div>
					                      </form>
					                    </div>
					                  </div>
					                </div>

				              	</div> 
				              </div>
				             </section>`;

		  res.render('body', {user:"Tamboré", sidebar:sidebar, header:"Ajuste de Estoque",content:content,layout:'main'});
		});	 
  });
});

module.exports = router;
