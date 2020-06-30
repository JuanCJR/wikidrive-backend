const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  userName: {
    type: String,
    required: true,
  },
  passwd: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

module.exports = model("User", UserSchema);
