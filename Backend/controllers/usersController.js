const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");


/** ---------------------------------------
 * @desc    Get All Users Profiles
 * @router  /api/users/profile
 * @method  GET
 * @access  private (only for Admin)
 ----------------------------------------*/

 module.exports.getAllUsersCtrl = asyncHandler(async (req, res) => {
   
   // Test Token from header 
   //console.log(req.headers.authorization.split(" ")[1]);
   
   
   // Get all users in variable users
    const users = await User.find();
    res.status(200).json(users);
 
   });
