const express = require("express");

const router = express.Router();
// In urls.routes we will restrict the shorten endpoint to only
// allow authenticated users to create shortened urls. Start by
// requiring passport in users.routes
const { shorten, redirect, deleteUrl } = require("./urls.controllers");
const passport = require("passport");
router.post(
  //In the /shorten/:userId route, call passport.authenticate()
  // and pass it "jwt" and { session: false } as arguments.
  "/shorten", //Remove the /:userId param from the route.
  passport.authenticate("jwt", { session: false }),
  shorten
);
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
router.get("/:code", redirect);
router.delete(
  "/:code",
  deleteUrl,
  //In the urls.routes, call passport.authenticate() and
  // pass it "jwt" and { session: false } as arguments in the
  // delete endpoint.
  passport.authenticate("jwt", { session: false })
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
);

module.exports = router;
