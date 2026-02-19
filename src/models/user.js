const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 255,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      minLength: 18,
      type: Number,
      maxLength: 100,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://www.ecured.cu/images/f/fb/ElonmuskeMe.jpg",
    },
    about: {
      type: String,
      default: "This is a default about of user!",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("user", userSchema);

module.exports = User;
