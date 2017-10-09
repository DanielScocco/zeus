 
var Purchase = require('../models/purchase');
var Product = require('../models/product');
var StockValue = require('../models/stockValue');

function calcCOGS(companyId,storeId, startDate, endDate, callback){  	

	Product.find({companyId:companyId},function(err, products){
	   if(err) console.log(err);  // log errors	 	  

	   //create productArray id => {product}
	   var productArray = {};  	  
	   for(var i=0;i<products.length;i++){  	
	     productArray[products[i]._id] = products[i];
	   }	   

	   StockValue.findOne({storeId:storeId,date:startDate},function(err, stockValue){
	      if(err) console.log(err);  // log errors	

	      if(stockValue!=null){
			  var startStock = stockValue.value;			    

			   StockValue.findOne({storeId:storeId,date:endDate},function(err, stockValue){
			        if(err) console.log(err);  // log errors	

				    if(stockValue!=null){
				    	var endStock = stockValue.value;

				    	console.log("start="+startDate);
  						console.log("end="+endDate);
  						console.log("storeid="+storeId);

					    //consider purchases
					    Purchase.find({storeId:storeId,date:{"$gte":startDate,"$lt":endDate}},function(err, purchases){
  							if(err) console.log(err);  // log errors

					        var totalPurchases = 0;
					        for(var i=0;i<purchases.length;i++){
					        	console.log("a");
					        	totalPurchases += purchases[i].totalCost;
					        }

					        var cogs = startStock + totalPurchases - endStock;  

					        callback(null,cogs);      
					                
					    });//Purchases
					}
					else{
						callback(null,-1);
					}
			    });//stockValue 2
			}
			else{
				callback(null,-1);  
			}
		});//stockValue 1
	});//Product
}

module.exports = calcCOGS;
