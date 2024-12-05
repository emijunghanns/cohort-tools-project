const router = require("express").Router();
const Student = require("../models/Student.model");

router.get("/", (req, res) => {
  Student.find({})
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved students -->", students);
      res.json(students);
    })
    .catch((error) => {
      // console.error("Error while retrieving students -->", error);
      // res.status(500).json({ error: "Failed to retrieve students" });
      next(error);
    });
});

//GET STUDENT FROM SPECIFIED COHORT
router.get("/cohort/:cohortId", (req, res) => {
  Student.find({ cohort: req.params.cohortId })
    .populate("cohort")
    .then((students) => res.status(200).json(students))
    .catch((error) =>
      // res.status(500).json({
      //   message:
      //     "Internal Server Error: Unable to find Students of specified Cohort",
      // })
      next(error)
    );
});

//GET STUDENT ROUTES BY ID

router.get("/:studentId", (req, res) => {
  Student.findById(req.params.studentId)
    .populate("cohort")
    .then((oneStudent) => {
      console.log("Retrieved students -->", oneStudent);

      res.json(oneStudent);
    })
    .catch((error) => {
      // console.error("Error while retrieving students -->", error);
      // res.status(500).json({ error: "Failed to retrieve students" });
      next(error);
    });
});

//POST STUDENTS ROUTES

router.post("/", (req, res) => {
  Student.create(req.body)
    .populate("cohort")
    .then((createdStudent) => {
      res.status(201).json(createdStudent);
    })
    .catch((error) => {
      // res.status(500).json(err);
      next(error);
    });
});

//PUT STUDENTS ROUTES BY ID

router.put("/:studentId", (req, res) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    .populate("cohort")
    .then((updatedStudent) => {
      res.status(200).json(updatedStudent);
    })
    .catch((error) => {
      // res.status(500).json(err);
      next(error);
    });
});

//DELETE STUDENTS ROUTES BY ID

router.delete("/:studentId", (req, res) => {
  Student.findByIdAndDelete(req.params.studentId)
    .populate("cohort")
    .then((deletedStudent) => {
      res.status(204).json(deletedStudent);
    })
    .catch((error) => {
      // res.status(500).json(err);
      next(error);
    });
});

module.exports = router;
