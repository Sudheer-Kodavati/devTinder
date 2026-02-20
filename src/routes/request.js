const express = require("express");
const requestRouter = express.Router();
const { isUserAuth } = require("../middlewares/auth");
requestRouter.post("/sendConnectionRequest", isUserAuth, (req, res) => {
  const user = req.user;

  console.log("request sent", user);
  res.send(user.firstName + " Sent the Connection request");
});

module.exports = requestRouter;
