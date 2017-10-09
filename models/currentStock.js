var mongoose = require('mongoose');
 
module.exports = mongoose.model('CurrentStock',{
    companyId: String,
    storeId: String,
    lastUpdate: String,
    value: Number,
    list: {}
});
