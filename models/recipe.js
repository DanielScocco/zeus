var mongoose = require('mongoose');
 
module.exports = mongoose.model('Recipe',{
    companyId: String,
    name: String,    
    list:[]
});
