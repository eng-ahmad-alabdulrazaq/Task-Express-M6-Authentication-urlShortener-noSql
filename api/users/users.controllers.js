const User = require("../../models/User");
//myimportmyrequire
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { localStrategy } = require("../../middlewares/passport");
//myimportmyrequire
//
//function to hash
const hash = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
//function to hash
//
//In users.controllers, create a function
//called generateToken that takes user as an argument.
const generateToken = async (user) => {
  //In this function, create an object called payload
  //and pass it the user's username and _id that's coming from user.
  const payload = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_TOKEN_EXP }); //check check
  return token;
};
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//After creating your payload object, call jwt.sign() and pass it two arguments:
// payload;
//JWT_SECRET;
//Add an object as a third parameter to the jwt.sign() function that has a
//expiresIn key and its value is the token's duration from the JWT_TOKEN_EXP variable.
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
const signup = async (req, res, next) => {
  try {
    //Hash the password with 10 salt rounds
    //and overwrite req.body.password with the new,
    //hashed password.
    req.body.password = await hash(req.body.password);
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //Pass the body of the request to User.create.
    const newUser = await User.create(req.body);
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //In the signup function, after creating the user
    //call generateToken and pass it the new user.
    //Save the returned value in a variable called token
    //and send it as a response (json object should have
    //a key of token with an encoded string as its value).
    let token = generateToken(newUser); // check check
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //Change the response status to 201 and end it with a message.
    res
      .status(201)
      .json({ token: token, msg: "THE REQUEST WAS SUCCESSFULLY FULFILLED!" }); //newUser
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  //In the signin function, call generateToken and pass it the user
  //object obtained from passport middleware.
  //Save the returned value in a variable called token and send it
  //as a response (json object should have a key of token with an
  //encoded string as its value).
  let token = generateToken(req.user); //?check if this is considered user object?
  res
    .status(201)
    .json({ token: token, msg: "THE REQUEST WAS SUCCESSFULLY FULFILLED!" });
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  //In the signin function, call generateToken and pass it the user object obtained from passport middleware.
  try {
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};

//just changed the export way
module.exports = {
  signup,
  signin,
  getUsers,
};
//just changed the export way
