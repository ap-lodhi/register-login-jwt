const express = require("express");
const Blog = require("../database/blogSchema");
const app = express();




app.delete('/deleteblog',async(req,res)=>{
     const { id } = req.params;
     console.log(id);
     const del = await Blog.deleteOne({ _id: id });
     if (del) {
       res.send({
         response: "succeess",
         message: "Blog deleted successfully",
       });
     } else {
       res.status(400).send({
         response: "error",
         message: "Blog Not found",
       });
     }
})

module.exports=app;