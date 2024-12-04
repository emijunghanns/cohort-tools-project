const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cohorts = require("./cohorts.json");
const students = require("./students.json");
const PORT = 5005;
const cors = require("cors");
const mongoose = require("mongoose");
const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");
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

//GET COHORTS ROUTES
app.get("/api/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts -->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts -->", error);
      res.status(500).json({ error: "Failed to retrieve cohorts" });
    });
});

//GET COHORT ROUTES BY ID

app.get("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findById(req.params.cohortId)
    .then((oneCohort) => {
      console.log("Retrieved cohorts -->", oneCohort);
      res.json(oneCohort);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts -->", error);
      res.status(500).json({ error: "Failed to retrieve cohorts" });
    });
});

//POST COHORTS ROUTES

app.post("/api/cohorts", (req, res) => {
  Cohort.create(req.body)
    .then((createdCohort) => {
      res.status(201).json(createdCohort);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//PUT COHORTS ROUTES BY ID
app.put("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
    .then((updatedCohort) => {
      res.status(200).json(updatedCohort);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//DELETE COHORTS ROUTES BY ID

app.delete("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .them((deletedCohort) => {
      res.status(204).json(deletedCohort);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//*************** STUDENTS ****************/

//GET STUDENTS ROUTES

app.get("/api/students", (req, res) => {
  Student.find({})
    .then((students) => {
      console.log("Retrieved students -->", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students -->", error);
      res.status(500).json({ error: "Failed to retrieve students" });
    });
});

//GET STUDENT FROM SPECIFIED COHORT

//GET STUDENT ROUTES BY ID

app.get("/api/students/:studentId", (req, res) => {
  Student.find(req.params.studentId)
    .then((oneStudent) => {
      console.log("Retrieved students -->", oneStudent);
      res.json(oneStudent);
    })
    .catch((error) => {
      console.error("Error while retrieving students -->", error);
      res.status(500).json({ error: "Failed to retrieve students" });
    });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
