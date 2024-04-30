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
    const users = await User.find().select("-password");
    res.status(200).json(users);
 
   });


   /** ---------------------------------------
 * @desc    Get Single User Profile
 * @router  /api/users/profile/id
 * @method  GET
 * @access  public
 ----------------------------------------*/

 module.exports.getUserProfileCtrl = asyncHandler(async (req, res) => {
   
  // Test Token from header 
  //console.log(req.headers.authorization.split(" ")[1]);
  
  
  // Get  usersin variable user
   const user = await User.findById(req.params.id).select("-password");
   
   if(!user){

    return res.status(404).json({message : "User not found"});

   }

   res.status(200).json(user);

  });
