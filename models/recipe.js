var mongoose = require('mongoose');
 
module.exports = mongoose.model('Recipe',{
    companyId: String,
    name: String,    
    isActive: Number,
    list:[]
});
