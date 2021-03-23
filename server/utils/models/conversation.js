const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
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
    lastMessage: {
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
        attachments: [{
                _id: Number,
                type:{
                    type: String,
                    require: true
                },
                ts: {
                    type: Date,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            }],
        unread: {
            type: Boolean,
            default: true
        }
    },
    unread: {
        type: Boolean,
        default: false
    }
});

module.exports.Conversation = mongoose.model("conversation", ConversationSchema);