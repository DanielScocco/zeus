var express = require('express');
var router = express.Router();
var isAuthenticated = require('./isAuthenticated.js');
var CurrentStock = require('../models/currentStock');
var Recipe = require('../models/recipe');
var updateStock = require('./updateStock');
var auxFunctions = require('./auxFunctions');
var Production = require('../models/production');

/* Get */
router.get('/', isAuthenticated, function(req, res, next) { 
    if(req.query['d']=='true'){
        Production.remove({_id:req.query['pid']}, function (err) {
             if (err) console.log(err);
             console.log("Removed production id="+req.query['id']);
        });
    }    
    res.redirect("/producao");
});

/* Post */
router.post('/', isAuthenticated, function(req, res, next) { 
	//check if stock is enough
	CurrentStock.findOne({storeId:req.user.storeIds[0]},function(err, currentStock){
  		if(err) console.log(err);  // log errors

  		var productStock = currentStock.list;

		//get items and quantities of recipe
		Recipe.findById(req.body.recipeId,function(err, recipe){
				if(err) console.log(err);
				
				//make sure stock is enough
				var enough = true;
				var productionQuantity = req.body.quantity;
				for (var i=0;i<recipe.list.length;i++){					
					if(productStock[recipe.list[i].id]==null){
						enough = false;
						break;
					}
					if(productionQuantity * recipe.list[i].quantity>productStock[recipe.list[i].id]){
						enough = false;
						break;
					}
				}

				if(enough){					
				    var production = new Production();   
				    production.companyId = req.user.companyId;
				    production.storeId = req.user.storeIds[0];
				    var currentDate = auxFunctions.formatDate(2,null);
				    production.date = currentDate;
				    production.recipeId = req.body.recipeId;
				    production.quantity = req.body.quantity;
				    production.list = recipe.list;
				    
				    production.save(function(err) {
				            if (err){
				                console.log('Error in Saving Production: '+err);  
				                throw err;  
				            }
				            console.log('Production Registration succesful');  
				            updateStock(req.user.companyId,req.user.storeIds[0]);       
				        });  
		   	}
		   	else{
		   		req.flash('stockAlert', 'Estoque insuficiente!')
		   	}

		    res.redirect("/producao");
		});
	});					
});

module.exports = router;