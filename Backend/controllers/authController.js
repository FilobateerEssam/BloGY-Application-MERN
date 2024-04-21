const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/User");

/** ---------------------------------------
 * @desc    Register a new User - Signup
 * @router  /api/auth/register
 * @method  POST
 * @access  Public
 ----------------------------------------*/

module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  // validation will write in the Model

  // data will take from req.body
  const { error } = validateRegisterUser(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // check if user already exists

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  // hash password before saving to database

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // new user and save to database

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  await user.save();


  // @TODO - Sending email to user for verification


  // send response to client

  res
    .status(201)
    .json({ message: "User registered successfully , Please Log in" });
});

/** ---------------------------------------
 * @desc    Login User 
 * @router  /api/auth/register
 * @method  POST
 * @access  Public
 ----------------------------------------*/

module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
  // validation will write in the Model

  // data will take from req.body
  const { error } = validateLoginUser(req.body);

  if (error) {
    return res.status(400).
    json({ message: error.details[0].message });
  }
  // check if user already exists

  let user = await User.findOne({ email: req.body.email });

  if(!user){
    return res.status(400).
    json({message:"Invalid Email or Password"});
  }

  // check password

  const isPasswordMatch = await bcrypt.compare(req.body.password,user.password);
  
  if(!isPasswordMatch){
    return res.status(400).
    json({message:"Invalid Email or Password"});
  }
  

  // generate token (JWT)

  const token = user.generateAuthToken();


  // @TODO - Sending email to user for verification

  
  // response to client

  res.status(200).json({
    _id : user._id,
    isAdmin : user.isAdmin,
    profilePhoto: user.profilePhoto,
    token,

  });

});
