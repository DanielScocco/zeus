var express = require('express');
var router = express.Router();
var isAuthenticated = require('./isAuthenticated.js');
var Recipe = require('../models/recipe');
var User = require('../models/user');

/* Get */
router.get('/', isAuthenticated, function(req, res, next) { 
    if(req.query['d']=='true'){
        Recipe.update({_id:req.query['rid']},{$set:{isActive:0}}, function (err) {
             if (err) console.log(err);
        });
    }    
    res.redirect("/receitas");
});

/* Post */
router.post('/', isAuthenticated, function(req, res, next) { 
    var recipe = new Recipe();
    recipe.companyId = req.user.companyId;
    recipe.name = req.body.name;    
    recipe.isActive = 1;
   
    var list = [];
    var n = req.body.numberOfProducts;

    for(var i=0;i<n;i++){
        var number = i + 1;
        var idName = 'subproduct' + number + 'id';
        var quantityName = 'subproduct' + number + 'quantity';
        var pair = {id:req.body[idName],quantity:parseFloat(req.body[quantityName])};
        list.push(pair);
    }

    recipe.list = list;        

    recipe.save(function(err) {
            if (err){
                console.log('Error in Saving Recipe: '+err);  
                throw err;  
            }
            console.log('Recipe Registration succesful');       
        });  

   res.redirect("/receitas");
           
});

module.exports = router;