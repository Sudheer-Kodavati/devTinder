const jwt = require("jsonwebtoken");
const User = require("../models/user");

const isUserAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login!");
    }
    const decodedData = await jwt.verify(token, "Dev@tender1908");
    const { _id } = decodedData;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    console.log(req.cookies);
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = { isUserAuth };
