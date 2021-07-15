const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhotoSchema = new Schema(
  {
    by: {
      _id: {
        type: String,
        required: true,
      },
    },
    ts: {
      type: Date,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false, // Version key needed to clear update files
  }
);

module.exports.Photo = mongoose.model("photo", PhotoSchema);
