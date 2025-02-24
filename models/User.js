const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:"String",
        required:[true,'Please Add A field Username'],
        trim: true,
        maxlength: [50, 'Username can not be more than 50 characters']
    },
    email:{
        type:"String",
        required:[true,'Please Add A field Email'],
        unique:true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'please add a valid email'
        ]
    },
    password:{
        type:"String",
        required:[true,'Please Add A field Password']
    },
    role: {
        type: String,
        enum: ['user', 'publisher'],
        default: 'user'
      }
},{
    timestamps:true
})

module.exports = mongoose.model('User',userSchema)