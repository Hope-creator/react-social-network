const express = require("express");
const { User } = require("../utils/models/user");
const router = express.Router();
const _ = require("lodash");

// #route:  GET /api/users?page=[1]&count=[10]&term=''&friend=false
// #desc:   Get users by query request, if all query empty return 10 first users
// #access: Public
router.get("/", async (req, res) => {
  let { page = 1, count = 10, term, friend, random = false } = req.query;
  if (count > 100) count = 100;
  let regExp = new RegExp(_.escapeRegExp(term), "gi");
  const query = term ? { name: regExp } : {};
  const friendRequest = friend
    ? { followers: { $elemMatch: { $eq: friend } } }
    : {};
  const pageQuery = page > 0 ? (page - 1) * count : 0;
  try {
    if (random) {
      const randomFriends = await User.aggregate([
        { $match: friendRequest },
        { $sample: { size: 10 } },
        { $project: { name: 1, id: 1, "profile.profilePicture": 1 } },
      ]);
      if (!randomFriends)
        res.json({ success: false, error: "Something went's wrong" });
      else {
        res.json({ success: true, randomFriends });
      }
    } else {
      const users = await User.find(
        { $and: [query, friendRequest] },
        "name id profile.status profile.profilePicture followers"
      )
        .skip(pageQuery)
        .limit(+count);
      const totalCount = await User.find({
        $and: [query, friendRequest],
      }).countDocuments();

      res.json({ success: true, items: users, totalCount });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

module.exports = router;
