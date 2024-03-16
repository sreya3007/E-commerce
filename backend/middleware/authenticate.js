const jwt =require ('jsonwebtoken');
const wrapAsync =require ('./errorHandling');
const User =require ('../models/user');

//user authentication middleware
const protect = wrapAsync(async (req, res, next) => {

  //getting the token from the cookie
 let token = req.cookies.jwt;

  if (token) {
    try {
      const verify = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(verify.userId); // trying to find a user on the basis of this token

      next();

    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token invalid');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const checkAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};


module.exports={protect,checkAdmin};