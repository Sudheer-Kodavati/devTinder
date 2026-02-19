const express = require("express");
const User = require("./models/user");
const connectDB = require("./config/database");
const app = express();

app.use(express.json());

// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     const users = await User.findOne({ emailId: userEmail });
//     if (users.length === 0) {
//       res.status(404).send("User not found");
//     } else {
//       res.send(users);
//     }
//   } catch (err) {
//     res.status(400).send("something went wrong");
//   }
// });

//feed get the user from db
app.get("/feed", async (req, res) => {
  const users = await User.findOne({ emailId: user });
  try {
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});
//sign up
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user added  successfullly");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

// //delete a user from data base
// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     const user = await User.findByIdAndDelete(userId);
//     res.send("UserId Deleted successfully");
//   } catch (err) {
//     res.status(400).send("User not found");
//   }
// });

//update the user from db
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  console.log(data);
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data);
    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send("Some thing went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established!!");
    app.listen(3000, () =>
      console.log("Server is successfully listening on port 3000...."),
    );
  })
  .catch((err) => {
    console.log("Database cannot be connected !");
  });
