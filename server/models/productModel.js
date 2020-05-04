import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: {type: String, required : true},
    image: {type: String, required : true},
    category: {type: String, required : true},
    price: {type: Number, default : 0, required : true},
    qtyInStock: {type: Number, default : 0, required : true},
    rating: {type: Number,default : 0, required : true},
    numOfRev: {type: Number,default : 0, required : true},
    description: {type: String, required : true},
    
})
const productModel = mongoose.model("Product", productSchema);

export default productModel;