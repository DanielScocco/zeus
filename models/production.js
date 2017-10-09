var mongoose = require('mongoose');
 
module.exports = mongoose.model('Production',{
    companyId: String,
    storeId: String,
    date: String,
    recipeId: String,   
    quantity: Number,
    list:[]
});
