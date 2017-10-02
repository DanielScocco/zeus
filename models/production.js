var mongoose = require('mongoose');
 
module.exports = mongoose.model('Production',{
    companyId: String,
    storeId: String,
    date: Date,
    recipeId: String,   
    quantity: Number,
    list:[]
});
