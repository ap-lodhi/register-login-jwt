const express = require("express");
const Blog = require("../database/blogSchema");
const app = express();



app.get('/getblog', async(req,res)=>{
     const data = await Blog.find();
     console.log(data);

     return res.status(200).send(data);
})

module.exports=app;