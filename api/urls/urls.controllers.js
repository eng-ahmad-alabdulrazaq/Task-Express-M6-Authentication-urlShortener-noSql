const Url = require("../../models/Url");
const shortid = require("shortid");
const User = require("../../models/User");

const baseUrl = "http:localhost:8000/urls";
//In the urls.controllers, modify the shorten function
//to use req.user instead of the route param.

exports.shorten = async (req, res) => {
  // create url code
  const urlCode = shortid.generate();
  try {
    req.body.shortUrl = `${baseUrl}/${urlCode}`;
    req.body.urlCode = urlCode;
    req.body.userId = req.user.userId; //use req.user instead of the route param.
    const newUrl = await Url.create(req.body);
    await User.findByIdAndUpdate(req.user.userId, {
      //use req.user instead of the route param.
      $push: { urls: newUrl._id },
    });
    res.json(newUrl);
  } catch (err) {
    next(err);
  }
};
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

exports.redirect = async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No URL Found");
    }
  } catch (err) {
    next(err);
  }
};

//In the urls.controllers's deleteUrl function, add a condition
//that will compare the ids of the user making the request, and
//the id of the user that created the instance. In the condition,
//only allow the user who created the url to delete the url.

exports.deleteUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      await Url.findByIdAndDelete(url._id);
      return res.status(201).json("Deleted");
    } else {
      return res.status(404).json("No URL Found");
    }
  } catch (err) {
    next(err);
  }
};
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
