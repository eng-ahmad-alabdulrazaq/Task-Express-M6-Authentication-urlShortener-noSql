//\\ بسم الله الرحمن الرحيم //\\

const bcrypt = require("bcrypt");
const User = require("../models/User"); //Don't forget to import User.
//Tokens can be extracted from the request in many ways.
// We will pass our token in the request's authorization header with
// the scheme bearer. We need to require fromAuthHeaderAsBearerToken.
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
const jwt = require("jsonwebtoken");
//In middleware, create a file called passport.js.
//Require LocalStrategy from passport-local.
const LocalStrategy = require("passport-local").Strategy; //Create a variable
//called localStrategy that's equal to a LocalStrategy instance.
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//
//In middleware/passport.js require JWTStrategy.
const JWTStrategy = require("passport-jwt").Strategy;
//In middleware/passport.js require JWTStrategy.
//
//We will create a JWT strategy instance, which takes two
//arguments, an options object and a callback function.
exports.jwtStrategy = new JWTStrategy(
  {
    //Now we will pass this function to our
    //options object. Also, we will pass our JWT_SECRET
    //for the key secretOrKey.
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  },
  //Now the second argument, an asynchronous callback function,
  //takes two arguments, the token's payload and done function.
  //So the JWT strategy decodes the token and passes the payload
  //as an argument.
  async (jwtPayload, done) => {
    //Check if the token is expired or not by comparing the
    //expiration date to the date right now. If the token is
    //expired, call done and pass it null and false as arguments,
    //which will throw a 401 error.
    if (Date.now() > jwtPayload.exp) {
      return done(null, false); // this will throw a 401
    }
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //If the token is not expired, we will find the user
    //with the ID saved in the token. You can use findOne
    //and pass it the username. Then we will pass the found
    //user to done. If no user is found, it will throw a 401 error.

    try {
      const student = await Student.findById(jwtPayload.id);
      done(null, student); // if there is no user, this will throw a 401
    } catch (error) {
      done(error);
    }
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  }
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
);

//We will create a JWT strategy instance, which takes two
//arguments, an options object and a callback function.

// Pass LocalStrategy an asynchronous function as an argument.
// This function receives three parameters: username, password and done.
//Add a try catch statement in the function. In the catch block,
//call done and pass it error.

exports.localStrategy = new LocalStrategy(
  { usernameField: "username", passwordField: "password" },

  async (username, password, done) => {
    try {
      //Look for a user in the User model that has the
      //username that's passed to the local strategy. Save
      //it in a variable called user.
      const user = await User.findOne({
        username: username, // equivalent to { name : name }
        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      });
      //If user exists, call bcrypt.compare() and pass it
      //password and user.password for comparison.

      if (user) {
        // TODO: compare password to authenticate user
        let passwordMatch = bcrypt.compare(password, user.password);
        //Save the returned value in a variable called passwordsMatch.
        if (passwordMatch) {
          return done(null, user); //Save the returned value in a variable called passwordsMatch.
        } else {
          return done({ msg: "THE USERNAME OR PASSWORD IS WRONG!" }, false);
        }
      } else {
        // If user doesn't exist, set passwordsMatch to false.
        return done({ msg: "THE USERNAME OR PASSWORD IS WRONG!" }, false);
      }

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    } catch (error) {
      done(error);
    }
  }
);
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
