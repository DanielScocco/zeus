var mongoose = require('mongoose');
 
module.exports = mongoose.model('Sale',{
    companyId: String,
    storeId: String,
    date: Date,
    productId: String, 
    quantity: Number,    
    totalValue: Number,
    list:[]
});
