const express = require("express");
const router = express.Router();
const authenticateToken = require("../utils/middleware/checkAuth");
const multer = require("multer");
const fs = require("fs");
const { User } = require("../utils/models/user");
const { Photo } = require("../utils/models/photo");

// Multer file filter
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(console.log("Wrong type"), false);
  }
};

// Define a storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./uploads/profilePictures/${req.userId}`);
  },
  filename: (req, file, cb) => {
    const date = Date.now();
    cb(null, date + "__" + file.originalname);
  },
});

const storagePhotos = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./uploads/profilePhotos/${req.userId}`);
  },
  filename: (req, file, cb) => {
    const date = Date.now();
    cb(null, date + "__" + file.originalname);
  },
});

// Create multer upload object
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
  fileFilter: fileFilter,
});

const uploadPhotos = multer({
  storage: storagePhotos,
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
  fileFilter: fileFilter,
});

// Create user folder
const createUserFolder = (req, res, next) => {
  const id = req.userId;
  if (!fs.existsSync(`./uploads/profilePictures/${id}`)) {
    fs.mkdirSync(`./uploads/profilePictures/${id}`);
  }
  next();
};

const createUserFolderPhotos = (req, res, next) => {
  const id = req.userId;
  if (!fs.existsSync(`./uploads/profilePhotos/${id}`)) {
    fs.mkdirSync(`./uploads/profilePhotos/${id}`);
  }
  next();
};

// #route : GET api/profile
// #desc : Get user profile
// #access : Public

router.get("/:userId", async (req, res) => {
  const id = req.params.userId;
  if (id.length != 24) {
    res.json({ Error: "Id must be string of 24 characters" });
  } else {
    let errors = [];
    try {
      const profile = await User.findById(id, "profile name followers");
      if (!profile) {
        errors.push("Profile doesn't exist");
        res.json({ success: false, errors });
      } else {
        res.json({ success: true, profile });
      }
    } catch (err) {
      console.log("Error on GET /api/news:", err);
      res.json({ success: false });
    }
  }
});

// #route:  PUT /photo
// #desc:   Upload a profile picture
// #access: Private
router.put(
  "/photo",
  authenticateToken,
  createUserFolder,
  upload.single("profilePicture"),
  async (req, res) => {
    const id = req.userId;
    const profilePictureUrl = req.file.path.replace(/\\/g, "/");
    if (!profilePictureUrl)
      res.json({ succes: false, error: "Upload file failed" });
    try {
      const user = await User.findByIdAndUpdate(
        id,
        {
          "profile.profilePicture":
            "http://localhost:5000/" + profilePictureUrl,
        },
        {
          new: true,
          projection: { "profile.profilePicture": 1 },
        }
      );
      if (!user) {
        res.json({
          success: false,
          error: "User not found",
        });
      } else {
        res.json({
          success: true,
          user,
        });
      }
    } catch (err) {
      res.json({ success: false, error: "Something went wrong" });
      console.log("ERROR on PUT /profile/photo", err);
    }
  }
);

// #route:  GET /photos
// #desc:   Get profile pictures
// #access: Public
router.get("/photos/:userId", async (req, res) => {
  const id = req.params.userId;
  const query = { "by._id": id };
  let { page = 1, count = 10 } = req.query;
  const pageQuery = page > 0 ? (page - 1) * count : 0;
  try {
    const profilePhotos = await Photo.find(query)
      .sort({ ts: -1 })
      .skip(pageQuery)
      .limit(+count);

    const photosCount = await Photo.find(query).countDocuments();
    if (!profilePhotos)
      res.json({ success: false, error: "Photos not finded" });
    else {
      res.json({ success: true, profilePhotos, photosCount });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: "Something went wrong" });
  }
});

// #route:  POST /photos
// #desc:   Add profile pictures
// #access: Private
router.post(
  "/photos",
  authenticateToken,
  createUserFolderPhotos,
  uploadPhotos.array("profilePhotos"),
  async (req, res) => {
    const id = req.userId;
    const { ts } = req.body;
    const errors = [];
    const savedPhotos = await Promise.all(
      req.files.map(async (file) => {
        const url = "http://localhost:5000/" + file.path.replace(/\\/g, "/");
        try {
          const savePhoto = new Photo({
            by: {
              _id: id,
            },
            ts: ts,
            url: url,
          });
          const savedPhoto = await savePhoto.save();
          return savedPhoto;
        } catch (error) {
          console.log(error);
          errors.push(error);
        }
      })
    );
    if (errors.length === 0) res.json({ success: true, savedPhotos });
    else {
      res.json({ success: false, errors });
      console.log("ERROR on POST profile/photos", errors);
    }
  }
);

// #route:  PUT /status
// #desc:   Changing profile status
// #access: Private
router.put("/status", authenticateToken, async (req, res) => {
  const id = req.userId;
  const newStatus = req.body.newStatus;
  if (newStatus && newStatus.length > 300)
    res.json({ success: false, error: "Status is too long" });
  else {
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { "profile.status": newStatus },
        {
          new: true,
          projection: { "profile.status": 1 },
        }
      );
      if (!user) {
        res.json({
          success: false,
          error: "User not found",
        });
      } else {
        res.json({
          success: true,
          user,
        });
      }
    } catch (err) {
      res.json({ success: false, error: "Something went wrong" });
      console.log("ERROR on PUT /profile/status", err);
    }
  }
});

// #route:  PUT /profile
// #desc:   Changing profile information
// #access: Private
router.put("/", authenticateToken, async (req, res) => {
  const id = req.userId;

  if (!req.body) {
    res.sendStatus(400);
  }

  const name = req.body.name;

  const { aboutMe, lookingForAJob, lookingForAJobDescription, contacts } =
    req.body.profile;

  const contactsLength = () => {
    for (let contact in contacts) {
      if (contacts[contact] && contacts[contact].length > 100) return true;
    }
    return false;
  };

  const errors = [];
  
  if (name && name.length > 50) errors.push("Name can be not more than 50 symbols");
  if (aboutMe && aboutMe.length > 300)
    errors.push("About field is 300 symbols max");
  if (typeof lookingForAJob !== "boolean")
    errors.push("Wrong looking for a job type");
  if (lookingForAJobDescription && lookingForAJobDescription.length > 300)
    errors.push("Looking for a job description is 300 symbols max");
  if (contactsLength()) errors.push("Contacts fields is 100 symbols max");

  if (errors.length > 0) res.json({ success: false, errors });
  else {
    try {
      const user = await User.findByIdAndUpdate(
        id,
        {
          "profile.aboutMe": aboutMe,
          name: name,
          "profile.lookingForAJob": lookingForAJob,
          "profile.lookingForAJobDescription": lookingForAJobDescription,
          "profile.contacts": contacts,
        },
        {
          new: true,
          projection: {
            profile: 1,
            name: 1,
            followers: 1,
          },
        }
      );

      if (!user) {
        res.json({
          success: false,
          error: "User not found",
        });
      } else {
        res.json({
          success: true,
          user,
        });
      }
    } catch (err) {
      res.json({ success: false, error: "Something went wrong" });
      console.log("ERROR on PUT /profile", err);
    }
  }
});

module.exports = router;
