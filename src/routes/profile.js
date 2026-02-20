const express = require("express");
const profileRouter = express.Router();
const { isUserAuth } = require("../middlewares/auth");

profileRouter.get("/profile", isUserAuth, async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("Invalid User");
    }
    console.log(user);
    res.send("The user is :" + user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
