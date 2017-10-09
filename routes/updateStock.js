 
var Production = require('../models/production');
var Product = require('../models/product');
var Purchase = require('../models/purchase');
var StockEdit = require('../models/stockEdit');
var Recipe = require('../models/recipe');
var CurrentStock = require('../models/currentStock');
var Sale = require('../models/sale');

function updateStock(companyId,storeId){
    var productStock = {};

    Product.find({companyId:companyId},function(err, products){
        if(err) console.log(err);  // log errors          

        //create productArray id => {product obj}
        var productArray = {};        
        for(var i=0;i<products.length;i++){     
           productArray[products[i]._id] = products[i];
        }
        //consider purchases
        Purchase.find({storeId:storeId},function(err, purchases){
            if(err) console.log(err);  // log errors
              
              for(var i=0;i<purchases.length;i++){
                //check if product is composite
                if(productArray[purchases[i].productId].isComposite==1){                 
                    var id = productArray[purchases[i].productId].list[0].id;
                    var quantity = purchases[i].quantity * productArray[purchases[i].productId].list[0].quantity;
                }
                else{
                    var id = purchases[i].productId;
                    var quantity = purchases[i].quantity;               
                }

                //product already in the array      
                if(productStock[id]!=null){         
                    productStock[id] = productStock[id] + quantity;
                    
                }
                //add product to array
                else{               
                    productStock[id] = quantity;
                }
              }

              //include adjustments
              StockEdit.find({storeId:storeId},function(err, stockEdits){
                if(err) console.log(err);  // log errors
                
                for(var i=0;i<stockEdits.length;i++){
                    var id = stockEdits[i].productId;
                    var quantity = stockEdits[i].adjustment; 
                    if(productStock[id]!=null){         
                        productStock[id] = productStock[id] + quantity;                   
                    }
                    //add product to array
                    else{               
                        productStock[id] = quantity;
                    }               
                }

                //include production
                Production.find({storeId:storeId},function(err, productions){
                  if(err) console.log(err);  // log errors  
                  
                  for(var i=0;i<productions.length;i++){                
                      for(j=0;j<productions[i].list.length;j++){
                         
                         if(productStock[productions[i].list[j].id]!=null){                             
                                productStock[productions[i].list[j].id] -= productions[i].quantity * productions[i].list[j].quantity;
                         }
                      }
                  }

                  //include sales
                  Sale.find({storeId:storeId},function(err, sales){
                   if(err) console.log(err);  // log errors

                   //iterate
                   for(var i=0;i<sales.length;i++){  
                   	  //composite
                   	  if(productArray[sales[i].productId].isComposite==1){             
	                      for(j=0;j<sales[i].list.length;j++){
	                         
	                         if(productStock[sales[i].list[j].id]!=null){                             
	                                productStock[sales[i].list[j].id] -= sales[i].quantity * sales[i].list[j].quantity;
	                         }
	                      }
	                  }
	                  //single
	                  else{
	                  	productStock[sales[i].productId] -= sales[i].quantity;
	                  }
                  }

                    //console.log(JSON.stringify(productStock));          

                    //update on db
                    CurrentStock.update({storeId:storeId}, {$set:{list:productStock}},function (err, result) {
                      if (err) return handleError(err);   
                    });                
                  });//Sale.find   
                });//Productiion.find
            });//StockEdit.find
        });//Purchase.find 
    });//Product.find
}

module.exports = updateStock;
