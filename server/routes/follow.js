const express = require("express");
const authenticateToken = require("../utils/middleware/checkAuth");
const { User } = require("../utils/models/user");
const router = express.Router();

// #route:  POST /api/follow/userId
// #desc:   Follow user
// #access: Private

router.post("/:userId", authenticateToken, async (req, res) => {
  const id = req.params.userId;
  let errors = [];
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $addToSet: { followers: req.userId } },
      { new: true }
    );

    if (!user) {
      errors.push("User doesn't exist");
      res.json({ success: false, errors });
    } else {
      res.json({ success: true, followed: true });
    }
  } catch (err) {
    console.log("Error on api/follow/:userId", err);
    res.json({ success: false });
  }
});

// #route:  DELETE /api/follow/userId
// #desc:   Unfollow user
// #access: Private

router.delete("/:userId", authenticateToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { followers: req.userId } },
      { new: true }
    );
    let errors = [];
    if (!user) {
      errors.push("User doesn't exist");
      res.json({ success: false, errors });
    } else {
      res.json({ success: true, unfollowed: true });
    }
  } catch (err) {
    console.log("Error on api/follow/:userId", err);
    res.json({ success: false });
  }
});

module.exports = router;
