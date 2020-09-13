const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    categoryid:{type:String,required:true},
    name:  {type:String,required:true},
    price:  {type:Number,required:true},
    Description: {type:String,required:true},
    size:{type:String,required:false},
    ProductsAvailable:{type:Number,required:true},
    Stock:{type:Number,required:true},
    picture: {type:String,required:true}
});
module.exports = mongoose.model('Product',productSchema);

/*const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});

module.exports = mongoose.model('Product', productSchema);
*/