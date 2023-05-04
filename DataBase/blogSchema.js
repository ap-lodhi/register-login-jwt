const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    
    title: String,
    author: String,
    content: String,
  },
  {
    timestamps: true,
  }
);


const Blog = mongoose.model("Blog", blogSchema);

module.exports =  Blog ;
