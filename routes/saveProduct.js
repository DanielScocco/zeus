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

    //rawMaterial
    if(req.body.israwmaterial==1)
        product.isRawMaterial = 1;
    else
        product.isRawMaterial = 0;

    //purchased
    if(req.body.ispurchased==1)
        product.isPurchased = 1;
    else
        product.isPurchased = 0; 

    //sold
    if(req.body.issold1==1||req.body.issold2==1){
        product.isSold = 1;
        product.price = req.body.price;
    }
    else{
        product.isSold = 0;
        product.price = null;
    }

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