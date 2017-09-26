var mongoose = require('mongoose');
 
module.exports = mongoose.model('Purchase',{
    companyId: String,
    storeId: String,
    date: Date,
    productId: String, 
    quantity: Number,
    supplier: String,
    receiptNumber: String,
    totalCost: Number
});
