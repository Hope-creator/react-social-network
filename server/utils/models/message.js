const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    fromId: {
        type: String,
        required: true
    },
    peerId: {
        type: String,
        required: true
    },
    ts: {
        type: Date,
        required: true
    },
    text: {
        type: String,
        default: null
    },
},
    {
        versionKey: false // Version key needed to clear update files
    });

module.exports.Message = mongoose.model("message", MessageSchema);