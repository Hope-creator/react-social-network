const express = require("express");
const router = express.Router();
const { Conversation } = require("../utils/models/conversation");
const authenticateToken = require("../utils/middleware/checkAuth");
const { Message } = require("../utils/models/message");
const multer = require("multer");
const fs = require("fs");

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