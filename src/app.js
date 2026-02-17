const express = require("express");

const app = express();
app.get("/user", (req, res) => {
  res.send({ firstName: "Sai Sudheer", lastName: "Kodavati" });
});
app.post("/user", (req, res) => {
  res.send("data is Successfully updated in DB");
});
app.delete("/user", (req, res) => {
  res.send("data is Successfully Deleted in DB");
});

app.use("/test", (req, res) => {
  res.send("Hello from the server...");
});

app.listen(3000, () =>
  console.log("Server is successfully listening on port 3000...."),
);
