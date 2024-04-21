// 1. Create a new table
const mongoose = require("mongoose");

// For Validation
const Joi = require("joi");

const jwt = require("jsonwebtoken");

// 2. User Schema al validation in Data Level

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        trim : true, // remove spaces left & Right
        minlength: 2 ,
        maxlength: 100 ,
    },
    email : {
        type: String,
        required: true,
        trim : true, // remove spaces left & Right
        minlength: 5 ,
        maxlength: 100 ,
        unique: true,
    },
    password : {
        type: String,
        required: true,
        trim : true, // remove spaces left & Right
        minlength: 8 ,
    },
    profilePhoto:{
        type: Object,
        default:{
            url:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
            publicId: null,
        }
    },
    bio : {
        type: String,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    isAccountVerified:{
        type: Boolean,
        default: false,
    }
},{
    timestamps:true, // have 2 property updated at , Created at

});


// 3. Generate Auth Token

UserSchema.methods.generateAuthToken = function(){
    return jwt.sign({id:this._id,isAdmin:this.isAdmin},process.env.JWT_SECRET);
}


// 4. User Model

const User = mongoose.model("User",UserSchema);

// validate Register User in Express Level

function validateRegisterUser(obj){
    const schema = Joi.object({
        username: Joi.string().min(2).max(100).required(),
        email: Joi.string().min(5).max(100).required().email(),
        password: Joi.string().min(8).required(),
    });

    return schema.validate(obj);

}


function validateLoginUser(obj){
    const schema = Joi.object({
        email: Joi.string().min(5).max(100).required().email(),
        password: Joi.string().min(8).required(),
    });

    return schema.validate(obj);

}

// 5. Export Model
module.exports = {
    User , 
    validateRegisterUser , 
    validateLoginUser ,

};