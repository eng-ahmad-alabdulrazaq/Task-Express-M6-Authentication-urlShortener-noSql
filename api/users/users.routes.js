const express = require("express");
//Start by requiring passport in users.routes
const passport = require("passport");
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

const router = express.Router();

const { signup, signin, getUsers } = require("./users.controllers");

router.post("/signup", signup);
//In the /signin route, call passport.authenticate() and pass it "local" and { session: false } as arguments.
router.post(
  "/signin",
  signin,
  passport.authenticate("local", { session: false })
);
//In the /signin route, call passport.authenticate() and pass it "local" and { session: false } as arguments.
router.get("/users", getUsers);

module.exports = router;
