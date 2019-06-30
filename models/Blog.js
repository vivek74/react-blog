const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  blogContent: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Blog = mongoose.model("blogs", blogSchema);
