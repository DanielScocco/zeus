var express = require('express');
var router = express.Router();
var isAuthenticated = require('./isAuthenticated.js');
var Product = require('../models/product');
var Sale = require('../models/sale');
var CurrentStock = require('../models/currentStock');
var updateStock = require('./updateStock');

/* Get */
router.get('/', isAuthenticated, function(req, res, next) { 
    if(req.query['d']=='true'){
        Sale.remove({_id:req.query['sid']}, function (err) {
             if (err) console.log(err);
             console.log("Removed sale id="+req.query['id']);
             updateStock(req.user.companyId,req.user.storeIds[0]); 
        });
    }    
    res.redirect("/vendas");
});

/* Post */
router.post('/', isAuthenticated, function(req, res, next) { 
	//check if stock is enough
	Product.find({companyId:req.user.companyId},function(err, products){
  	    if(err) console.log(err);  // log errors	 	  

  	    //create productArray id => {product obj}
        var productArray = {};        
        for(var i=0;i<products.length;i++){     
           productArray[products[i]._id] = products[i];
        }
  	    
  	    CurrentStock.findOne({storeId:req.user.storeIds[0]},function(err, currentStock){
	  		if(err) console.log(err);  // log errors

	  		var productStock = currentStock.list;
			
	  		var enough = true;
	  		var saleQuantity = req.body.quantity;
	  		if(productArray[req.body.productId].isComposite==1){
	  			//check you have enough of each component
	  			for(var i=0;i<productArray[req.body.productId].list.length;i++){
	  				if(productStock[productArray[req.body.productId].list[i].id]==null){
						enough = false;
						break;
					}
					if(saleQuantity * productArray[req.body.productId].list[i].quantity > productStock[productArray[req.body.productId].list[i].id]){
						enough = false;
						break;
					}
	  			}
	  		}
	  		else{

	  		}

			if(enough){			
			    var sale = new Sale(); 	
			    sale.companyId = req.user.companyId;
			    sale.storeId = req.user.storeIds[0];
			    sale.date = req.body.date;
			    sale.productId = req.body.productId;
			    sale.quantity  = req.body.quantity;
			    sale.totalValue = req.body.saleTotalCost;
			    if(productArray[req.body.productId].isComposite==1)
			    	sale.list = productArray[req.body.productId].list;
			    else
			    	sale.list = null;
			    
			    sale.save(function(err) {
			            if (err){
			                console.log('Error in Saving Sale: '+err);  
			                throw err;  
			            }
			            console.log('Sale Registration succesful'); 
			            updateStock(req.user.companyId,req.user.storeIds[0]);       
			        });  
		   	}
		   	else{
		   		req.flash('saleAlert', 'Estoque insuficiente!')
		   	}

		    res.redirect("/vendas");
					
		});//CurrentStock		
	});//Product.find         
});

module.exports = router;