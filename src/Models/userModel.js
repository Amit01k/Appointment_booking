
const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        enum:["Mr.", "Mrs.","Miss"]
    },
    user_name: {
        type: String,
        required: true
    },
    appointment_status: {
        type: String,
        required: true,
        enum:["normal","emergency"]
    },
    appointment_starting_time: {
        type: String,
        required: true,
        unique:true
    },
    appointment_end_time:{
        type:String,
        required:true,
        unique: true
    },
    mobile_number:{
        type:String,
        required:true,
        unique: true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password: {
        type:String,
        required:true
    },
    deletedAt: {
        type: Date,
        required: false,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true },
)

module.exports=mongoose.model("user_data",userModel)