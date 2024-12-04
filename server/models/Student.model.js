const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const studentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  linkedinUrl: String,
  languages: [
    {
      type: String,
      enum: [
        "English",
        "Spanish",
        "French",
        "German",
        "Portuguese",
        "Dutch",
        "Other",
      ],
    },
  ],
  program: {
    type: String,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
  },
  background: String,
  image: { type: String, defalut: "https://i.imgur.com/r8bo8u7.png" },
  cohort: { type: Schema.Types.ObjectId, ref: "Cohort" },
  projects: Array,
});

// CREATE MODEL
// The model() method defines a model (Cohort) and creates a collection (cohorts) in MongoDB
// The collection name will default to the lowercased, plural form of the model name:

const Student = mongoose.model("Student", studentSchema);

// EXPORT THE MODEL
module.exports = Student;
