const express = require("express");
const router = express.Router();
const auth = require("../../../middlewares/auth");
const User = require("../../../models/User");
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});
module.exports = router;
