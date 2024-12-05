function errorHandler(error, req, res, next) {
  console.log("ERROR", req.method, req.path, error);
  if (!res.headerSent) {
    res.status(500).json({ message: "Internal server error" });
  }
  next();
}

function notFoundHandler(req, res, next) {
  res.status(404).json({ message: `Failed to find ${req.path}` });
  next();
}

module.exports = {
  errorHandler,
  notFoundHandler,
};
