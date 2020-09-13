const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    categoryid:{type:String,require:true},
    name:{type:String,require:true},
    orderDate: { type: Date, default: Date.now()},
    address:  {type:String,require:true},
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 },
    phoneno:{type:Number,
        require:true,
        unique:true,
        match:/((\+*)((0[ -]+)*|(91 )*)(\d{12}|\d{10}))|\d{5}([- ]*)\d{6} /
},
    picture: {type:String}
});

module.exports = mongoose.model('Order', orderSchema);



/*const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    categoryname:{type:String},
    orderDate: { type: Date, default: Date.now()},
    address:  {type:String,require:true},
    product:{type:mongoose.Schema.Types.ObjectId,ref:'product'},
    quantity: {type: Number,default:1},
    phoneno:{type:Number,
        required: true,
        unique: true,
    match:/^(\+\d{1,3}[- ]?)?\d{10}$/
},
    picture: {type:String},
    createdAt: Date,

});
module.exports = mongoose.model('order',orderSchema);
*/