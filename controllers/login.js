const express = require("express");
const bcrypt = require("bcryptjs");

const app = express();

const jwt = require("jsonwebtoken");
const User = require("../database/userSchema");

const SECRET_KEY =
  "srtjkjklmnot8852za@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk";
// Register user route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  const userFound = await User.findOne({
    username,
  });

  if (!userFound) {
    return res.status(400).send({
      response: "error",
      message: "invalid username",
    });
  } else {
    let matched = bcrypt.compareSync(password, userFound.password);
    console.log(userFound.password);
    if (matched) {
      let { username } = userFound;
      const token = jwt.sign({ username }, SECRET_KEY);
      res.status(200).send({
        response: "Success",
        message: "Successfully logged in",
        user: username,
      });
      console.log(token);
    } else {
      return res.status(400).send({
        response: "Error",
        message: "Invalid Password",
      });
    }
  }
});

module.exports = app;
