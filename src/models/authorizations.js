const { Schema, model } = require("mongoose");

const authorizationsSchema = new Schema(
  {
    objName: {
      type: String,
    },
    objPath: {
      type: String,
    },
    objSize: {
      type: Number,
    },
    uploadBy: {
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
  },
  {
    timestamps: true,
  }
);

module.exports = model("authorizations", authorizationsSchema);
