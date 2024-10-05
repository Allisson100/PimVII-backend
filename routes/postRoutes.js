const express = require("express");
const { upload } = require("../config/multer.js");
const { PostController } = require("../controllers/postController.js");

const routes = express.Router();

routes.post("/create", upload.array("files"), PostController.createPost);

module.exports = routes;
