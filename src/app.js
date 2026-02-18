const express = require("express");
const app = express();

app.get("/getUserData", (req, res) => {
  try {
    throw new Error("hbhxbyhbfd");
    res.send("user data sent");
  } catch (err) {
    res.status(500).send("Some thing went wrong contact support team");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Some thing went wrong");
  }
});

app.listen(3000, () =>
  console.log("Server is successfully listening on port 3000...."),
);
