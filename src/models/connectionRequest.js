const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user", //reference to User collection
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "intrested", "accepted", "rejected"],
        message: `{VALUE} is inccorect status type`,
      },
    },
  },
  {
    timestamps: true,
  },
);

connectionRequestSchema.pre("save", function () {
  const connectionRequest = this;
  //check from UserId and toUserId are same
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You cannot send connection request to your self");
  }
});

const connectionRequestModel = new mongoose.model(
  "connectionRequest",
  connectionRequestSchema,
);
module.exports = connectionRequestModel;
