const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs');
const { User, Blog } = require('../DataBase/schema');


const SECRET_KEY = 'srtjkjklmnot8852za@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';



// Register user route 


async function register(req, res) {
    let { username,
        password: pass } = req.body;

    if (!username || typeof username !== 'string') {
        return res.json({
            status: 'error',
            error: 'Invalid username'
        })
    }
    if (pass.length < 7) {
        return res.json({
            status: 'error',
            error: 'Password too small. Should be atleast 8 characters'
        })
    }



    const password = bcrypt.hashSync(pass, 10)
    try {
        await User.create({
            username,
            password,

        })

        return res.status(200).send({
            response: "success",
            message: 'user Register Successfully'
        })

    } catch (error) {
        if (error.code === 11000) {

            return res.json({
                status: 'error',
                error: 'User already exists '
            })
        }


    }

}

// Login user 


async function login(req,res){
    const {username, password} =req.body

    const userFound =await User.findOne({
        username
    })

    if(!userFound){
       return  res.status(400).send({
        response:"error",
        message:"invalid username"
       })
    }else{
        let matched = bcrypt.compareSync(password , userFound.password)
        console.log(userFound.password)
        if(matched){
            let {username} = userFound
            const token = jwt.sign({username }, SECRET_KEY)
            res.status(200).send({
                response:'success',
                message:'successfully loged in',
                data :token,
                user:{
                    username
                }
            })
            console.log(token)
        }else{
            return res.status(400).send({
                response:'error',
                message:'Invalid Password'
            })
        }
    }
}



//crud oprations for user 

// for creating blog

async function createBlog(req,res){
    let {title, author ,content}=req.body

    let userId =User.id
    if(!title){
        return res.send({
            response:"error",
            message:"add title "
        })
    }else{
        await Blog.create({
            userId,
            title,
            author,
            content
        })

        return res.status(200).send({
            response:'success',
            message:"Blog is created Successfully"
        })
    }
}


// get all the blog 


async function getBlog(req, res) {
    const data = await Blog.find()
    console.log(data)

    return res.status(200).send(data)

}

// update the  blog

async function updateBlog(req, res) {
    const { id } = req.params;
    let { title,author,content,  } = req.body

    const updated = await Blog.findByIdAndUpdate
        (id, {
            title:title,
            author: author,
            content:content,
    
        })
    if (!updated) {
        res.status(404).send({
            response: 'error',
            message: 'Emplyoee not found'
        })
    } else {
        res.status(200).send({
            response: 'success',
            message: "Blog updated successfully"
        })
    }
}

// for delete the blog 

async function deleteBlog(req,res){
    const{id} = req.params;
    console.log(id)
const del =await Blog.deleteOne({_id:id})
if(del){
    res.send({
        response:"succeess",
        message:"Blog deleted successfully"
    })

}else{
    res.status(400).send({
        response:"error",
        message:"Blog Not found"
    })
}


}


module.exports ={register,login,  createBlog ,getBlog ,updateBlog ,deleteBlog}