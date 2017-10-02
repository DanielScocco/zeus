var mongoose = require('mongoose');
 
module.exports = mongoose.model('Product',{
    companyId: String,
    name: String,
    isPurchased: Number,
    isSold: Number,
    isRawMaterial: Number,
    isComposite: Number,
    price: Number,
    list:[]
});
