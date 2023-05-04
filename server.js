const express  = require('express');
const {register, login, createBlog, getBlog, updateBlog, deleteBlog} = require('./controllers/user');
const connectDb = require('./DataBase/db');
const  swaggerJsDoc =require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express');
const { User } = require('./DataBase/schema');

User


const app = express();
const PORT = process.env.PORT ||8080 ;

app.use(express.json());
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Register-Login-JWT',
        version: '1.0.0',
        description:"Simple register-login page "
      },
      servers: [
        {
          url: 'http://localhost:8080/'
        }
      ]
    },
    apis: ['./server.js']
  };

const swaggerSpec = swaggerJsDoc(options)
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec))

/**
 * @swagger 
 * /:
 *  get:
 *      summary: this api for to check server
 *      description: checking
 *      responses:
 *           200:
 *               description: to test get method
 * 
 */

app.get('/',(req,res)=>{
    res.send("welcome")
})

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Create a new user
 *     
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/User'
 *     responses:
 *       200:
 *         description: The User was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schema/User'
 *       11000:
 *         description: Username already exists
 */

app.post('/api/register',register)


/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login a existing user
 *    
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The User was successfully logged in.
 */

app.post('/api/login',login)

app.post('/creatblog', createBlog)

app.get('/getblog', getBlog)

app.patch("/updateblog/:id", updateBlog)


app.delete("/deleteblog/:id", deleteBlog)


connectDb().then(()=>{

    app.listen(PORT, ()=>{
    
        console.log(`server is  runing on port no. ${PORT}`)
    })
})

