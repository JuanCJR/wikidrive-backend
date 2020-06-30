const { Schema, model } = require("mongoose");

const authorizationsSchema = new Schema({
  objName: {
    type: String,
  },
  objPath: {
    type: String,
  },
  objType: {
    type: String,
  },
  authorizations: {
    type: {
      type: String,
    },
    users: {
      type: Array,
    },
    groups: {
      type: Array,
    },
  },
});

module.exports = model("authorizations", authorizationsSchema);
