var mongoose = require('mongoose');
 
module.exports = mongoose.model('Store',{
    companyId: String,
    name: String   
});
