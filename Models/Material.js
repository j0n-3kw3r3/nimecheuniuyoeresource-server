const mongoose = require("mongoose");

const materialsSchema = mongoose.Schema(
  {
    year: {
      type: String,
    },
    courseCode: {
      type: String,
    },
    courseName: {
      type: String,
    },
    courseLecturer: {
      type: String,
    },
    materialName: {
      type: String,
    },
    materialLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Material", materialsSchema);
