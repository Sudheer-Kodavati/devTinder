const express = require("express");
const app = express();
const { isAdminAuth, isUserAuth } = require("./middlewares/auth");

app.use("/admin", isAdminAuth);
// app.use("/user", isUserAuth);

app.get("/admin/getData", (req, res) => {
  res.send("Data sent successfully");
});

app.post("/user/login", (req, res) => {
  res.send("Logged in successfully");
});

app.get("/user", isUserAuth, (req, res) => {
  res.send("User Data sent");
});

app.get("/admin/delete", (req, res) => {
  res.send("Data deleted");
});

app.get("/admin/user", (req, res) => {
  res.send("user data sent");
});

app.listen(3000, () =>
  console.log("Server is successfully listening on port 3000...."),
);
