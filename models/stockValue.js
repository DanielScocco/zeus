var mongoose = require('mongoose');
 
module.exports = mongoose.model('StockValue',{
    companyId: String,
    storeId: String,
    date: Date,
    value: Number
});
