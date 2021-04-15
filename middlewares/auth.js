const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async (req, res, next) => {
  //get token from header
  const token = req.header("x-auth-token");

  //check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
  } catch (err) {
    return res.json(401).json({ message: "Token is not valid" });
  }
  next();
};
