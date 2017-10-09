var mongoose = require('mongoose');
 
module.exports = mongoose.model('StockEdit',{
    companyId: String,
    storeId: String,
    date: String,
    productId: String,
    adjustment: Number,
    reason: String,
    affectsCOGS: Number
});
