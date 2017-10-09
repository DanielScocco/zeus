var mongoose = require('mongoose');
 
module.exports = mongoose.model('StockValue',{
    companyId: String,
    storeId: String,
    date: String,
    value: Number
});
