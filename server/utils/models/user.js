const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "basic",
    },
    status: {
        type: String,
        default: "pending",
    },
    accepted: {
        type: Boolean,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
    },
    followers: {
        type: Array,
        default: []
    },
    profile: {
        profilePicture: {
            type: String,
            default: null
        },
        status: {
            type: String,
            default: null
        },
        aboutMe: {
            type: String,
            default: null
        },
        lookingForAJob: {
            type: Boolean,
            default: null
        },
        lookingForAJobDescription: {
            type: String,
            default: null
        },
        contacts: {
            github: {
                type: String,
                default: null
            },
            vk: {
                type: String,
                default: null
            },
            facebook: {
                type: String,
                default: null
            },
            instagram: {
                type: String,
                default: null
            },
            twitter: {
                type: String,
                default: null
            },
            website: {
                type: String,
                default: null
            },
            youtube: {
                type: String,
                default: null
            },
            mainlink: {
                type: String,
                default: null
            }
        }
    }
});

module.exports.User = mongoose.model("user", UserSchema);