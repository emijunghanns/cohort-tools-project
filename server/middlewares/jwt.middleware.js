const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  try {
    // Just to avoid typing req.headers.authorization.split(" ") two times
    const authorizationHeaders = req.headers.authorization.split(" "); // authorizationHeaders === req.headers.authorization.split(" ") ^^
    if (authorizationHeaders[0] === "Bearer" && authorizationHeaders[1]) {
      const theToken = authorizationHeaders[1];
      const payload = jwt.verify(theToken, process.env.TOKEN_SECRET);
      console.log("Here is the JWT payload : ", payload);
      req.payload = { currentUser: payload };
      next();
    } else {
      res.status(403).json({ message: "No Token Present" });
    }
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
}

module.exports = { isAuthenticated };
