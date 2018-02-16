var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
  uname: String,
  img: String,
  caption: String,
  date: {
    type: Date,
    default: Date.now()
  },
  comments: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comments"
    }
  ]
});

module.exports = mongoose.model("posts", PostSchema);
