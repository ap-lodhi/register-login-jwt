const express = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../database/userSchema");
const app = express();
// const User = require()
// Register user route
app.post("/register", async (req, res) => {
  const { username, password: pass } = req.body;

  console.log(req.body);

  if (!username || typeof username !== "string") {
    return res.json({
      status: "error",
      error: "Invalid username",
    });
  }
  if (pass.length < 7) {
    return res.json({
      status: "error",
      error: "Password too small. Should be atleast 8 characters",
    });
  }

  const password = bcrypt.hashSync(pass, 10);
  try {
    await User.create({
      username,
      password,
    });

    return res.status(200).send({
      response: "success",
      message: "User Register Successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({
        status: "error",
        error: "User already exists ",
      });
    }
  }
});

module.exports = app;
