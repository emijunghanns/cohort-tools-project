const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cohorts = require("./cohorts.json");
const students = require("./students.json");
const PORT = 5005;
const cors = require("cors");
const mongoose = require("mongoose");

const studentsRouter = require("./routes/students.route");
const cohortsRouter = require("./routes/cohorts.route");
const authRouter = require("./routes/auth.routes");

const {
  errorHandler,
  notFoundHandler,
} = require("./middlewares/error-handling");
// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

//DATABASE CONNECTION
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const settings = { origin: [`http://localhost:5005`, `http://localhost:5173`] };
app.use(cors(settings));

// ROUTES - https://expressjs.com/en/starter/basic-routing.html

// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

//*************** COHORTS ****************/

app.use("/api/cohorts", cohortsRouter);

//*************** STUDENTS ****************/

app.use("/api/students", studentsRouter);

//*************** USER ****************/

app.use("/auth", authRouter);

//****************************************************/

app.use(errorHandler);
app.use(notFoundHandler);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
