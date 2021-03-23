const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    by: {
        _id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    ts: {
        type: Date,
        required: true
    },
    detail: {
        text: {
            type: String,
            default: null
        },
        attachments: [{
            _id: Number,
            type:{
                type: String,
                require: true
            },
            ts: {
                type: Number,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }]
    }
});

module.exports.Post = mongoose.model("post", PostSchema);