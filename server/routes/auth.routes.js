const router = require("express").Router();
const User = require("../models/User.model");

//********* SIGN UP *********//
router.post("/signup", async (req, res, next) => {
  try {
    const createdUser = await User.create(req.body);
    console.log("user created", createdUser);
    res.status(201).json(createdUser);
  } catch (error) {
    // console.log(err);
    // res.status(500).json({ errorMessage: "error on signup" });
    next(error);
  }
});

//********* LOGIN *********//
router.post("/login", async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
      const userInDBPassword = foundUser.password;
      const userFromFrontEndPassword = req.body.password;
      if (userInDBPassword === userFromFrontEndPassword) {
        res.status(200).json({ message: "logged in", foundUser });
      } else {
        return res
          .status(500)
          .json({ message: "invalid password credentials" });
      }
    } else {
      return res.status(500).json({ message: "invalid email credentials" });
    }
  } catch (error) {
    // console.log(err);
    // res.status(500).json({ errorMessage: "error on login" });
    next(error);
  }
});

module.exports = router;
