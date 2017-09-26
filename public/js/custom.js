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