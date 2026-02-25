const express = require("express");
const requestRouter = express.Router();
const { isUserAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
requestRouter.post(
  "/request/:status/:toUserId",
  isUserAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const allowedStatus = ["intrested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type " + status });
      }
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User not found!" });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        res
          .status(400)
          .json({ message: "Connection request already exists!!" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.json({
        message: req.user.firstName + status + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  },
);

// requestRouter.post(
//   "/request/review/:status/:requestId",
//   isUserAuth,
//   async (req, res) => {
//     try {
//       const loggedInUser = req.user;
//       const { status, requestId } = req.params;
//       const allowedStatus = ["accepted", "rejected"];
//       if (!allowedStatus.includes(status)) {
//         return res.status(400).json({ message: "status not allowed" });
//       }
//       const connectionRequest = await ConnectionRequest.findOne({
//         _id: requestId,
//         toUserId: loggedInUser._id,
//         status: "intrested",
//       });

//       console.log("RequestId from params:", requestId);

//       if (!connectionRequest) {
//         return res
//           .status(404)
//           .json({ message: "Connection request not found" });
//       }
//       connectionRequest.status = status;
//       const data = await connectionRequest.save();
//       const test = await ConnectionRequest.findById(requestId);
//       console.log("Request from DB:", test);
//       res.json({
//         message: "connection request " + status,
//         data,
//       });
//     } catch (err) {
//       res.status(400).send("ERROR: ", err.message);
//     }
//   },
// );

requestRouter.post(
  "/request/review/:status/:requestId",
  isUserAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Status not allowed" });
      }

      const connectionRequest = await ConnectionRequest.findById(requestId);

      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found" });
      }

      if (!connectionRequest.toUserId.equals(loggedInUser._id)) {
        return res.status(403).json({ message: "Not authorized" });
      }

      if (connectionRequest.status !== "intrested") {
        return res.status(400).json({ message: "Already reviewed" });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();
      console.log("RequestId from params:", requestId);

      const byId = await ConnectionRequest.findById(requestId);
      console.log("findById result:", byId);

      console.log("LoggedInUser:", loggedInUser._id);

      res.json({
        message: "Connection request " + status,
        data,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
);

module.exports = requestRouter;
