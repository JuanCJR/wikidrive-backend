const { Schema, model } = require("mongoose");

const GroupSchema = new Schema({
  groupName: {
    type: String,
    required: true
  },
  members: {
    type:Array,
    userName: {
      type: String
    }
  }
});

module.exports = model('groups',GroupSchema);