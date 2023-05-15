const mongoose = require("mongoose");


// product schema for creating model for creating the product model in database in MongoDB
const ProductSchema = mongoose.Schema({
  id: Number,
  imageURL:String,
  name: String,
  price: Number,
  rating:String,
offerDate:String,
offer:Boolean,
  category: String,


});


const PorductModel = mongoose.model("product", ProductSchema);

module.exports = PorductModel;

