const { post } = require("../models/post.js");
const uploadFilesToS3 = require("../utils/uploadFIlesToS3.js");

class PostController {
  static async createPost(req, res) {
    try {
      const files = req.files;
      const dataform = JSON.parse(req.body.dataform);

      let fileArray = [];

      if (files && Array.isArray(files)) {
        files?.forEach((file) => {
          fileArray.push(file?.filename);
        });
      }

      if (files?.length !== 0) {
        try {
          const uploadedFileNames = await uploadFilesToS3("pimVII", fileArray);

          fileArray = uploadedFileNames;
        } catch (error) {
          throw new Error();
        }
      }

      const newPost = new post({
        name: dataform?.name,
        title: dataform?.title,
        description: dataform?.description,
        files: fileArray,
      });

      await newPost.save();

      res.status(200).json({
        message: "Postagem criada com sucesso",
        success: true,
      });
    } catch (error) {
      res.status(200).json({
        message: "Erro ao criar postagem",
        success: false,
      });
    }
  }

  static async getAllPosts(req, res) {
    try {
      const posts = await post.find().sort({ createdAt: -1 });

      res.status(200).json({
        message: "Sucesso ao buscar postagens",
        success: true,
        posts: posts || [],
      });
    } catch (error) {
      res.status(500).json({
        message: "Erro ao buscar postagens",
        success: false,
      });
    }
  }
}

module.exports = { PostController };
