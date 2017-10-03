 
var Purchase = require('../models/purchase');
var CurrentStock = require('../models/currentStock');
var Product = require('../models/product');

function calcStockValue(companyId,storeId, callback){  
	Product.find({companyId:companyId},function(err, products){
	  	if(err) console.log(err);  // log errors	 	  

	  	  //create productArray id => {product}
	  	  var productArray = {};  	  
	  	  for(var i=0;i<products.length;i++){  	
	  	    productArray[products[i]._id] = products[i];
	  	  }

		CurrentStock.findOne({storeId:storeId},function(err, currentStock){
	  		if(err) console.log(err);  // log errors 

	  		var stock = currentStock.list;
	  		//product id => [amountCovered, value]
	  		var stockValue = {};
	  		for(var id in stock){
	  			stockValue[id] = [0,0];
	  		}

		    //consider purchases
		    Purchase.find({storeId:storeId},null,{sort: {date: -1}},function(err, purchases){
		        if(err) console.log(err);  // log errors

		          for(var i=0;i<purchases.length;i++){
		          	var totalCost = purchases[i].totalCost;
		            //check if product is composite
		            if(productArray[purchases[i].productId].isComposite==1){ 		
		            	//console.log("composite");            	       
		                var id = productArray[purchases[i].productId].list[0].id;
		                var quantity = purchases[i].quantity * productArray[purchases[i].productId].list[0].quantity;
		            }
		            else{
		                var id = purchases[i].productId;
		                var quantity = purchases[i].quantity;               
		            }
		            var unitCost = totalCost / quantity;	 

		            //proudct is in stock
		            if(stock[id]!=null){
		            	//stock value for this oproduct noy fully calculated yet
		            	if(stockValue[id][0]<stock[id]){
		            		//how much we need to fill
		            		var needFill = stock[id] - stockValue[id][0];
		            		if(quantity>needFill)
		            			quantity = needFill;

		            		stockValue[id][0] += quantity;
		            		stockValue[id][1] += unitCost * quantity;

		            		//console.log("quantity="+quantity);
		            		//console.log("unitycost="+unitCost);		            		
		            	}
		            }

		          }

		          callback(null,stockValue);      
		                
		    });//Purchases
		});//CurrentStock
	});//Product
}

module.exports = calcStockValue;
