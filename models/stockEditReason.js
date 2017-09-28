var mongoose = require('mongoose');
 
module.exports = mongoose.model('StockEditReason',{
    companyId: String,
    reason: String,
    affectsCOGS: Number
});
