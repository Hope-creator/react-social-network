const express = require("express");
const router = express.Router();
const { Post } = require("../utils/models/post");
const authenticateToken = require("../utils/middleware/checkAuth");
const { User } = require("../utils/models/user");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./uploads/posts/${req.userId}`);
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
}


// #route : GET api/news/wall
// #desc : Getting user posts
// #access : Public

router.get("/wall/:userId", async (req, res) => {
    const id = req.params.userId;
    const query = { "by._id": id };
    let { page = 1, count = 10} = req.query;
    
    const pageQuery = page > 0 ? ((page - 1) * count) : 0;
    try {
        const response = await Post.find(query)
        .sort({ts: -1})
        .skip(pageQuery)
        .limit(+count);
        const postsCount = await Post.find(query).countDocuments()
        if(!response) res.json({success: false, error: "Posts not find"})
        else {
            res.json({ success: true, posts: response, postsCount})
        }
    }
    catch (err) {
        console.log("Error on GET /api/news/wall: ", err);
        res.json({ success: false, error: "Something went wrong" })
    }
})

// #route : POST api/news/wall
// #desc : Create new post
// #access : Private

router.post("/wall", authenticateToken,createUserFolder, upload.array('attachments', 10), async (req, res) => {
    const id = req.userId;
    if (!id) {
        res.json({ success: false })
    }
    const name = await User.findById(id, "name");
    const {
        ts,
        text,
    } = req.body;
    const path = `${req.protocol}://${req.get("host")}`;
    const attachments = req.files.map(file=> {
        const fileUrl = file.path.replace(/\\/g, "/");
        return {
            type: file.mimetype.match("image") ? "image" : "video",
            ts: ts,
            url: path + fileUrl
        }
    })
    let errors = [];
    if (!ts) {
        errors.push("Wrong post type")
        res.json({ success: false, errors })
    }
    
    try {
       const newPost = new Post({
            by: {
                _id: id,
                name
            },
            ts,
            detail: {
                text,
                attachments
            }
        })
        const post = await newPost.save();
        res.json({ success: true, post})
    }
    catch (err) {
        console.log("Error on POST /api/news/wall: ", err);
        errors.push("Oh something went wrong")
        res.json({ success: false, errors })
    }
})


// #route : GET api/news
// #desc : Getting news from followed users
// #access : Private


router.get("/", authenticateToken, async (req, res) => {
    const id = req.userId;
    let errors = [];
    let { page = 1, count = 10} = req.query;
    const pageQuery = page > 0 ? ((page - 1) * count) : 0;
    const queryFindFriends = id ? { followers: { '$elemMatch': { $eq: id } } } : {};

    try {
        const followedUsers = (await User.find(queryFindFriends, "_id")).map(id => id._id)
        const response = await Post.find({ "by._id": { $in: followedUsers } })
        .sort({ts: -1})
        .skip(pageQuery)
        .limit(+count);

        const newsCount = await Post.find({ "by._id": { $in: followedUsers } }).countDocuments()

        res.json({ success: true, newsItems: response , totalCount: newsCount })
    }
    catch (err) {
        console.log("Error on GET /api/news/wall: ", err);
        res.json({ success: false })
    }
})

module.exports = router;