const express = require("express");
const profileRouter = express.Router();
const { isUserAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", isUserAuth, async (req, res) => {
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

profileRouter.patch("/profile/edit", isUserAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit request");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.send(`${loggedInUser.firstName}, your profile updated successfully`);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
