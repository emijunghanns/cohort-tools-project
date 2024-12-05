const router = require("express").Router();
const Cohort = require("../models/Cohort.model");

//GET COHORTS ROUTES
router.get("/", (req, res, next) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts -->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      //console.error("Error while retrieving cohorts -->", error);
      next(error);
    });
});

//GET COHORT ROUTES BY ID

router.get("/:cohortId", (req, res) => {
  Cohort.findById(req.params.cohortId)
    .then((oneCohort) => {
      console.log("Retrieved cohorts -->", oneCohort);
      res.json(oneCohort);
    })
    .catch((error) => {
      //   console.error("Error while retrieving cohorts -->", error);
      //   res.status(500).json({ error: "Failed to retrieve cohorts" });
      next(error);
    });
});

//POST COHORTS ROUTES

router.post("/", (req, res) => {
  Cohort.create(req.body)
    .then((createdCohort) => {
      res.status(201).json(createdCohort);
    })
    .catch((error) => {
      //   res.status(500).json(err);
      next(error);
    });
});

//PUT COHORTS ROUTES BY ID
router.put("/:cohortId", (req, res) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
    .then((updatedCohort) => {
      res.status(200).json(updatedCohort);
    })
    .catch((error) => {
      //   res.status(500).json(err);
      next(error);
    });
});

//DELETE COHORTS ROUTES BY ID

router.delete("/:cohortId", (req, res) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .them((deletedCohort) => {
      res.status(204).json(deletedCohort);
    })
    .catch((error) => {
      //   res.status(500).json(err);
      next(error);
    });
});

module.exports = router;
