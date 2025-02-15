const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:"String",
        required:[true,'Please Add A field Username']
    },
    email:{
        type:"String",
        required:[true,'Please Add A field Email'],
        unique:true
    },
    password:{
        type:"String",
        required:[true,'Please Add A field Password']
    }
},{
    timestamps:true
})

module.exports = mongoose.model('User',userSchema)