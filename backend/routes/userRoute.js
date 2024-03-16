const express= require('express');
const router=express.Router();
const User =require('../models/user'); // later we will use the data in mongoDb this just for test
const wrapAsync =require('../middleware/errorHandling');
const jwt =require('jsonwebtoken');
//const sendEmails =require('..utils/sendEmail');
const {protect}=require('../middleware/authenticate');


const generateToken =require ('../utils/generateToken');


//login
router.post('/api/users/login', wrapAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) { // to add matchPassword in useer model
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
}));

//register 
router.post( '/api/users',wrapAsync(async (req, res) => {
  const { name, email, password } = req.body; // deconstructing it from req.body

  const userExists = await User.findOne({ email : email}); //we will use email in order to find user

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  //creation of new user incase user does not exist
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);// do this if user exist

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Invalid Data');
  }
}));

//to logout user but token integration need to be done not able to get the token on api testing
//thats why right now this aint working
router.post( '/api/users/logout',(req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logout Success!!!!!' });
});

//to access user profile
router.get('/api/users/profile', protect , wrapAsync(async (req, res) => {
  const user = await User.findById(req.user._id); // getting user details using mongoId can use e-mail also

  if (user) { //if user exists (postman me test krne ke liye)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
}));

// will use to update user's profile
router.put('/api/users/profile', protect , wrapAsync(async (req, res) => {
  const user = await User.findById(req.user._id); //gets user from database using 

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // basically if new password is provided then it updates else it remains same
    if (req.body.password) {
      user.password = req.body.password;//user.password in database
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
}));



module.exports=router;