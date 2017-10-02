/*
document.addEventListener("DOMContentLoaded", function (event) {
    var _selector = document.querySelector('input[name=group]');
    _selector.addEventListener('change', function (event) {
    	var field1 = document.getElementById("groupfield1");
   		var field2 = document.getElementById("groupfield2");
        if (_selector.checked) {
            field1.style.display = "block";
     	   field2.style.display = "block";
        } else {
            field1.style.display = "none";
        	field2.style.display = "none";
        }
    });
});
*/

//listener on  sales -> totalCost
document.addEventListener("DOMContentLoaded", function (event) {
    var _selector = document.getElementById("saleTotalCost");       
    if(_selector!=null){     
        _selector.addEventListener('change', function (event) {   
            var price = parseFloat(document.querySelector('input[name=price]').value);            
            var quantity = document.getElementById("saleQuantity");           
            if(price!=null){
                var totalCost = parseFloat(_selector.value);
                var n = parseInt(totalCost / price);
                quantity.value = ""+n;
            }
        });
    }
});

//listener on  sales -> quantity
document.addEventListener("DOMContentLoaded", function (event) {
    var _selector = document.getElementById("saleQuantity");       
    if(_selector!=null){     
        _selector.addEventListener('change', function (event) {   
            var price = parseFloat(document.querySelector('input[name=price]').value);            
            var totalCost = document.getElementById("saleTotalCost");           
            if(price!=null){
                var quantity = parseInt(_selector.value);
                var total = quantity * price;
                totalCost.value = ""+total.toFixed(2);
            }
        });
    }
});

//Listener on sales->product select
document.addEventListener("DOMContentLoaded", function (event) {
    var _selector = document.getElementById("saleProductId");       
    if(_selector!=null){
        var productPrices = document.getElementById("productPrices").value;
        var price = document.querySelector('input[name=price]');
        var products = productPrices.split(";");
        var arr = {};
        for(var i=0;i<products.length;i++){
            var parts = products[i].split("-");
            arr[parts[0]] = parts[1];
        }
        _selector.addEventListener('change', function (event) {            
            price.value = String(parseFloat(arr[_selector.value]).toFixed(2));
        });
    }
});

document.addEventListener("DOMContentLoaded", function (event) {
    var _selector = document.querySelector('input[name=issold1]');
    if(_selector!=null){
        _selector.addEventListener('change', function (event) {            
            var priceDiv = document.getElementById("price1");        
             if (_selector.checked) {
                priceDiv.style.display = "block";               
            } else {
                priceDiv.style.display = "none";                
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function (event) {
    var _selector = document.querySelector('input[name=issold2]');
    if(_selector!=null){
        _selector.addEventListener('change', function (event) {            
            var priceDiv = document.getElementById("price2");        
             if (_selector.checked) {
                priceDiv.style.display = "block";               
            } else {
                priceDiv.style.display = "none";                
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function (event) {
    var _selector = document.querySelector('input[name=unitcost]');
    if(_selector!=null){
        _selector.addEventListener('change', function (event) {
            var totalcostInput = document.getElementById("totalcost");        
            var quantity = parseInt(document.getElementById("purchasequantity").value); 
            var unitCost = parseFloat(_selector.value);
            var totalCost = quantity * unitCost;
            totalcostInput.value = ""+totalCost.toFixed(2);
        });
    }
});

document.addEventListener("DOMContentLoaded", function (event) {
    var _selector = document.querySelector('input[name=totalcost]');
    if(_selector!=null){
        _selector.addEventListener('change', function (event) {
            var unitcostInput = document.getElementById("unitcost");        
            var quantity = parseInt(document.getElementById("purchasequantity").value); 
            var totalCost = parseFloat(_selector.value);
            var unitCost = totalCost / quantity;
            unitcostInput.value = ""+unitCost.toFixed(2);
        });
    }
});

function addProductField(){
    var nProductsField = document.getElementById('numberOfProducts');
    var nProducts = parseInt(nProductsField.value) + 1;

    //make row visible
    var id = "product" + nProducts + "row";
    var row = document.getElementById(id);    
    row.style.display = 'block';
    
    //update n. products
    nProductsField.value = ""+nProducts;
}