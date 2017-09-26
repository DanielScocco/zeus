var express = require('express');
var router = express.Router();
var isAuthenticated = require('./isAuthenticated.js');
var Product = require('../models/product');
var User = require('../models/user');

/* Get */
router.get('/', isAuthenticated, function(req, res, next) { 
    if(req.query['d']=='true'){
        Product.remove({_id:req.query['id']}, function (err) {
             if (err) console.log(err);
        });
    }    
    res.redirect("/produtos");
});

/* Post */
router.post('/', isAuthenticated, function(req, res, next) { 
    var product = new Product();
    product.name = req.body.productName;
    product.companyId = req.user.companyId;
    product.isRawMaterial = req.body.israwmaterial;
    product.isPurchased = req.body.ispurchased;
    product.isSold = req.body.issold;

    //composite product
    if(req.body.isComposite==1){        
        //create list of subproducts
        var list = [];
        var n = req.body.numberOfProducts;

        for(var i=0;i<n;i++){
            var number = i + 1;
            var idName = 'subproduct' + number + 'id';
            var quantityName = 'subproduct' + number + 'quantity';
            var pair = {id:req.body[idName],quantity:req.body[quantityName]};
            list.push(pair);
        }

        product.list = list;
        product.isComposite = 1;
        

    }
    //not composite product
    else{
        product.isComposite = 0;
        product.list = null;      
    }

    product.save(function(err) {
            if (err){
                console.log('Error in Saving Product: '+err);  
                throw err;  
            }
            console.log('Product Registration succesful');       
        });  

   res.redirect("/produtos");
           
});

module.exports = router;