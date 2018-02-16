var mongoose = require("mongoose");

var CommentSchema = new mongoose.Schema({
  text: String,
  uname: String
});

module.exports = mongoose.model("comments", CommentSchema);
