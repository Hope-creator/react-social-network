const express = require("express");
const router = express.Router();
const { Conversation } = require("../utils/models/conversation");
const authenticateToken = require("../utils/middleware/checkAuth");
const { Message } = require("../utils/models/message");
const multer = require("multer");
const fs = require("fs");

/*const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./uploads/messages/${req.userId}`);
    },
    filename: (req, file, cb) => {
        const date = Date.now();
        cb(null, date + "__" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ||
        file.mimetype === 'video/mp4' || file.mimetype === 'video/webm' ||
        file.mimetype === 'video/mpeg' || file.mimetype === 'video/3gpp') {
        cb(null, true)
    } else {
        cb(console.log("Wrong type"), false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2000
    },
    fileFilter: fileFilter
});

const createUserFolder = (req,res, next) => {
    const id = req.userId;
    if (!fs.existsSync(`./uploads/posts/${id}`)){
        fs.mkdirSync(`./uploads/posts/${id}`);
    }
    next();
}*/


// #route : GET api/conversations
// #desc : Getting user conversations
// #access : Private

router.get("/conversations",authenticateToken , async (req, res) => {
    const id = req.userId;
    const conversationsQuery = { "fromId": id };
    let { page = 1, count = 10} = req.query;
    
    const pageQuery = page > 0 ? ((page - 1) * count) : 0;
    try {
        const conversations = await Conversation.find(conversationsQuery)
        .sort({"lastMessage.ts": -1})
        .skip(pageQuery)
        .limit(+count);
        const conversationsCount = await Conversation.find(conversationsQuery).countDocuments()
        if(!conversations) res.json({success: false, error: "Conversations not find"})
        else {
            res.json({ success: true, conversations, conversationsCount})
        }
    }
    catch (err) {
        console.log("Error on GET api/messages/conversations:", err);
        res.json({ success: false, error: "Something went wrong" })
    }
})

// #route : GET api/messages
// #desc : Getting user messages
// #access : Private

router.get("/messages",authenticateToken , async (req, res) => {
    const id = req.userId;
    let { page = 1, count = 10, peerId = ""} = req.query;
    const fromUserQuery = {$or: [
        {"fromId": id, "peerId": peerId},
        {"fromId": peerId,"peerId": id}
    ] };
    const pageQuery = page > 0 ? ((page - 1) * count) : 0;
    try {
        const messages = await Message.find(fromUserQuery)
        .sort({ts: -1})
        .skip(pageQuery)
        .limit(+count);
        const messagesCount = await Message.find(fromUserQuery).countDocuments()
        if(!messages) res.json({success: false, error: "Messages not find"})
        else {
            res.json({ success: true, messages, messagesCount})
        }
    }
    catch (err) {
        console.log("Error on GET api/messages/messages:", err);
        res.json({ success: false, error: "Something went wrong" })
    }
})

module.exports = router;