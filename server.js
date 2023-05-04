require("dotenv").config();
const express = require("express");
const connectDb = require("./database/db");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
const PORT = process.env.PORT || 8080;

//Swagger initialization
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Register-Login-app",
      description: "Register-Login- with jwt Backend Documentation",
      contact: {
        name: "Oyesters ",
      },
      servers: [`http://localhost:${PORT}`],
    },
  },
  apis: ["server.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const register = require("./controllers/register");
const login = require("./controllers/login");
const addblog = require("./controllers/addBlog");
const getBlog = require("./controllers/getBLog");
const updateBlog = require("./controllers/updateBLog");
const deleteBlog = require("./controllers/deleteBlog");

app.use("/backend", register);
app.use("/backend", login);
app.use("/backend", addblog);
app.use("/backend", getBlog);
app.use("/updateblog", updateBlog);
app.use("/backend", deleteBlog);

/**
 * @swagger
 * /backend/register:
 *  post:
 *    tags:
 *      - Authentication
 *    summary: Register user
 *    parameters:
 *      - in: body
 *        name: body
 *        description: Register user
 *        required: true
 *        example: {"username":"user@gmail.com","password":"12345678"}
 *    responses:
 *      '200':
 *        description: Success
 *      '203':
 *        description: failure
 */

/**
 * @swagger
 * /backend/login:
 *  post:
 *    tags:
 *      - Authentication
 *    summary: Login user
 *    parameters:
 *      - in: body
 *        name: body
 *        description: Login user
 *        required: true
 *        example: {"username":"user@gmail.com","password":"123456"}
 *    responses:
 *      '200':
 *        description: Success
 *      '203':
 *        description: failure
 */

/**
 * @swagger
 * /backend/addblog:
 *  post:
 *    tags:
 *      - Blog
 *    summary: Adding Blog
 *    parameters:
 *      - in: body
 *        name: body
 *        description: Adding Blog
 *        required: true
 *        example: { "title":"my life story","author":"anil", "content": "thisis my life story"}
 *    responses:
 *      '200':
 *        description: Success
 *      '203':
 *        description: failure
 */

/**
 * @swagger
 * /backend/login:
 *  post:
 *    tags:
 *      - Authentication
 *    summary: Login user
 *    parameters:
 *      - in: body
 *        name: body
 *        description: Login user
 *        required: true
 *        example: {"username":"user@gmail.com","password":"123456"}
 *    responses:
 *      '200':
 *        description: Success
 *      '203':
 *        description: failure
 */

/**
 * @swagger
 * /backend/getblog:
 *  get:
 *    tags:
 *      - Blog
 *    summary: Fetching Blog
 *    responses:
 *      '200':
 *        description: Success
 *      '203':
 *        description: failure
 */



connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is  runing on port no. ${PORT}`);
  });
});
