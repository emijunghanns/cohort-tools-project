const router = require("express").Router();
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/jwt.middleware");

//********* SIGN UP *********//
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailAlreadyTaken = await User.findOne({ email });
    if (emailAlreadyTaken)
      res.status(403).json({ messsage: "Invalid Credentials" });
    else {
      const salt = bcryptjs.genSaltSync(12);
      const hashedPassword = bcryptjs.hashSync(password, salt);
      const createdUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      res.status(201).json({ data: createdUser });
      return;
    }
    const createdUser = await User.create(req.body);
    console.log("user created", createdUser);
    res.status(201).json(createdUser);
  } catch (error) {
    console.log(error);
    // res.status(500).json({ errorMessage: "error on signup" });
    next(error);
  }
});

//********* LOGIN *********//
router.post("/login", async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
      const DBPassword = foundUser.password;
      const loginPassword = req.body.password;
      const passwordsMatch = bcryptjs.compareSync(loginPassword, DBPassword);
      console.log("Does Password Match", passwordsMatch);

      if (passwordsMatch) {
        const { _id, username } = foundUser;
        const currentUser = { _id, username };
        const authToken = jwt.sign(currentUser, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "24h",
        });
        console.log("here is the auth token", authToken);
        res.status(200).json({ message: "logged in", authToken });
      } else {
        return res
          .status(500)
          .json({ message: "invalid password credentials" });
      }
    } else {
      return res.status(500).json({ message: "invalid email credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "error on login" });
    // next(error);
  }
});

router.get("/verify", isAuthenticated, (req, res) => {
  res.status(200).json(req.payload.currentUser);
});

module.exports = router;
