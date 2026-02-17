const express = require("express");

const app = express();

app.use(
  "/user",
  [
    (req, res, next) => {
      console.log("1");
      next();
    },
    (req, res, next) => {
      console.log("2");
      next();
    },
    (req, res, next) => {
      console.log("3");
      next();
    },
    (req, res, next) => {
      console.log("4");
      next();
    },
  ],
  (req, res, next) => {
    console.log("5");
    next();
  },
  (req, res, next) => {
    console.log("6");
    next();
  },
  (req, res, next) => {
    console.log("7");
    next();
  },
  (req, res, next) => {
    console.log("8");
    next();
  },
  (req, res, next) => {
    console.log("9");
    res.send("Route Handler");
  },
);

app.listen(3000, () =>
  console.log("Server is successfully listening on port 3000...."),
);
