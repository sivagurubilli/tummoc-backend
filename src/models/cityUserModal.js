const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        Name:{type:String, required:true},
        Email:{type:String, required:true},
        City:{
            Name:{type:String, required:true},
            State:{type:String, required:true},
            pin:{type:String, required:true}
        }
    },
    {
        versionKey:false,
        timestamps:true,
    }
)

const User = mongoose.model("user",userSchema)

module.exports = User