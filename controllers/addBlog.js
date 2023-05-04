const express = require("express");
const Blog = require("../database/blogSchema");

const app = express();


app.post("/addblog", async (req, res) => {
  let { title, author, content } = req.body;

  
  if (!title) {
    return res.send({
      response: "error",
      message: "add title ",
    });
  } else {
    await Blog.create({
    
      title,
      author,
      content,
    });

    return res.status(200).send({
      response: "success",
      message: "Blog is created Successfully",
    });
  }
});

module.exports = app;
