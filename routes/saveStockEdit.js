var express = require('express');
var router = express.Router();
var isAuthenticated = require('./isAuthenticated.js');
var StockEditReason = require('../models/stockEditReason');
var StockEdit = require('../models/stockEdit');
var auxFunctions = require('./auxFunctions');
var updateStock = require('./updateStock');

/* Get */
router.get('/', isAuthenticated, function(req, res, next) { 
    if(req.query['d']=='true'){
        StockEdit.remove({_id:req.query['sid']}, function (err) {
             if (err) console.log(err);
             console.log("Removed stock edit id="+req.query['id']);
             updateStock(req.user.companyId,req.user.storeIds[0]);  
        });
    }    
    res.redirect("/estoque");
});

/* Post */
router.post('/', isAuthenticated, function(req, res, next) { 
   //saving new reason
   if(req.body.newReason=='true'){
       var productId = req.body.pid; 
       stockEditReason = new StockEditReason();

       stockEditReason.companyId = req.user.companyId;
       stockEditReason.reason = req.body.reason;
       stockEditReason.affectsCOGS = 0;

       stockEditReason.save(function(err) {
                if (err){
                    console.log('Error in Saving Stock Edit Reason: '+err);  
                    throw err;  
                }
                console.log('Stock Edit Reason Registration succesful');       
            }); 

       res.redirect("/ajusteEstoque?pid="+productId);
    }
    //saving stock edit
    else{
        var stockEdit = new StockEdit();
        stockEdit.companyId = req.user.companyId;
        stockEdit.storeId = req.user.storeIds[0];
        var currentDate = auxFunctions.formatDate(2,null);
        stockEdit.date = currentDate
        stockEdit.productId = req.body.pid; 
        stockEdit.adjustment = req.body.adjustment;
        stockEdit.reason = req.body.reason;
        stockEdit.affectsCOGS = 0;

        stockEdit.save(function(err) {
                if (err){
                    console.log('Error in Saving Stock Edit: '+err);  
                    throw err;  
                }
                console.log('Stock Edit Registration succesful');  
                updateStock(req.user.companyId,req.user.storeIds[0]);        
            }); 

        res.redirect("/estoque");
    }           
});

module.exports = router;