const mongoose = require("mongoose");

// Define a schema for the counter
const counterSchema = new mongoose.Schema({
  count: { type: Number, default: 0 },
});

// Create a model based on the schema


module.exports = mongoose.model('Counter', counterSchema);