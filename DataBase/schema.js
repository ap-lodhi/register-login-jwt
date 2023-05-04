const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true }
	},
	
)
const blogSchema = mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    title:String,
   author:String,
    content:String,
   
},{
    timestamps:true
})

const User =mongoose.model('User',UserSchema)
const Blog =mongoose.model('Blog',blogSchema)

module.exports ={User,Blog}