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
 * @desc    Get Users Count
 * @router  /api/users/count
 * @method  GET
 * @access  private (only for Admin)
 ----------------------------------------*/
 module.exports.getUsersCountCtrl = asyncHandler(async (req, res) => {
   
  // Get all users in variable users
   const count = await User.count();
   res.status(200).json(count);

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


/**----------------------------------------
 * @desc   Update Single User Profile
 * @route /api/users/Profile/:id
 * @method Put
 * @access private (only user himself and admin can't update))  
/**---------------------------------------- */


module.exports.UpdateUserProfileCtrl = asyncHandler(async (req,res) => {
    

  // validation from user model

  const {error} = validateUpdateUser(req.body);

  if(error) {
         return res.status(400).json({message: error.details[0].message});
  }

  // check password encryption

  if(req.body.password) {
     
     // salt is random string added to password to make it more secure   
     const salt = await bcrypt.genSalt(10);
     
     // hash password
     req.body.password = await bcrypt.hash(req.body.password, salt);
  }

   // update user

  const updatedUser = await User.findByIdAndUpdate(req.params.id,{
     // set used to update only the fields that are sent in the request body
     // pros : if we have 100 fields and we want to update only 1 field we use set
     // cons : if we have 100 fields and we want to update 99 fields we use save
     // Ex : if we want to update only username will Update only username and leave the password and bio as it is
     $set: {
         username: req.body.username,
         password: req.body.password,
         bio: req.body.bio,
     }
  },{new: true}).select("-password");

  res.status(200).json({updatedUser});
});