var mongoose = require("mongoose")

var UserSchema = new mongoose.Schema({
  uname: String,
  name: String,
  password: String,
  posts: [
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts"
  ]
});

module.exports = mongoose.model("users", UserSchema);
