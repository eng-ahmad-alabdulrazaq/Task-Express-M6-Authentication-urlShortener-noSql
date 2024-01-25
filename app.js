const express = require("express");
const connectDb = require("./database");
const urlRoutes = require("./api/urls/urls.routes");
const userRoutes = require("./api/users/users.routes");
const notFoundHandler = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");
//Require passport in app.js.
const passport = require("passport");
// Passport Setup //thanks bro
// app.use(passport.initialize()); //Call the app.use method and pass it passport.initialize().
//Require passport in app.js.
//In app.js, require the localStrategy instance that we just created.
// Passport Strategies
const { localStrategy } = require("./middleware/passport");
const { jwtStrategy } = require("./middlewares/passport"); //Require jwtStrategy
//In app.js, require the localStrategy instance that we just created.
//Under the passport initialization, call passport.use() and pass it localStrategy.
// app.use(passport.initialize());
// passport.use(localStrategy);
//Under the passport initialization, call passport.use() and pass it localStrategy.

//Let's initialize our strategy in app.js.
//Require jwtStrategy and pass it to passport.use().
//Passport seriously thank you
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
//Let's initialize our strategy in app.js.
//Require jwtStrategy and pass it to passport.use().
const app = express();
connectDb();

app.use(express.json());

app.use("/urls", urlRoutes);
app.use(userRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
