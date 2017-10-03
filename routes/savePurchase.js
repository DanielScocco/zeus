var express = require('express');
var router = express.Router();
var isAuthenticated = require('./isAuthenticated.js');
var Product = require('../models/product');
var Purchase = require('../models/purchase');
var updateStock = require('./updateStock');

/* Get */
router.get('/', isAuthenticated, function(req, res, next) { 
    if(req.query['d']=='true'){
        Purchase.remove({_id:req.query['id']}, function (err) {
             if (err) console.log(err);
             console.log("Removed purchase id="+req.query['id']);
             updateStock(req.user.companyId,req.user.storeIds[0]);
        });
    }    
    res.redirect("/compras");
});

/* Post */
router.post('/', isAuthenticated, function(req, res, next) { 
	//set date with + 8 hour, used because of data filters by month
	var fullDate = new Date(req.body.date);					
	fullDate.setHours(fullDate.getHours()+8);

    var purchase = new Purchase();   
    purchase.companyId = req.user.companyId;
    purchase.storeId = req.user.storeIds[0];
    purchase.date = fullDate;
    purchase.productId = req.body.productId;
    purchase.quantity = req.body.quantity;
    purchase.supplier = req.body.supplier;
    purchase.receiptNumber = req.body.receiptNumber;
    purchase.totalCost = req.body.totalcost;

    purchase.save(function(err) {
        if (err){
            console.log('Error in Saving Purchase: '+err);  
            throw err;  
        }
        console.log('Purchase Registration succesful');  
        updateStock(req.user.companyId,req.user.storeIds[0]);     
    });  

    res.redirect("/compras");
           
});

module.exports = router;