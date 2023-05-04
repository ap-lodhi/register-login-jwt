const express = require("express");
const Blog = require("../database/blogSchema");
const app = express();

app.patch("/updateblog", async (req, res) => {
  let { title, author, content, id } = req.body;

  const updated = await Blog.findByIdAndUpdate( {
    id,
    title: title,
    author: author,
    content: content,
  });
  if (!updated) {
    res.status(404).send({
      response: "error",
      message: "Emplyoee not found",
    });
  } else {
    res.status(200).send({
      response: "success",
      message: "Blog updated successfully",
    });
  }
});

module.exports = app;
