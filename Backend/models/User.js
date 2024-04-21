// 1. Create a new table
const mongoose = require("mongoose");


// 2. User Schema

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

// 3. User Model

const User = mongoose.model("User",UserSchema);

// 4. Export Model
module.exports = {
    User
};