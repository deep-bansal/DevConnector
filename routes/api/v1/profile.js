const express = require("express");
const router = express.Router();
const auth = require("../../../middlewares/auth");
const Profile = require("../../../models/Profile");
const User = require("../../../models/User");

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no Profile for this user" });
    }

    return res.json(profile);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});
module.exports = router;
