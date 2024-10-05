const { post } = require("../models/post.js");

class PostController {
  static async createPost(req, res) {
    try {
      //   const files = req.files;
      const dataform = JSON.parse(req.body.dataform);

      const newPost = new post({
        name: dataform?.name,
        title: dataform?.title,
        description: dataform?.description,
      });

      await newPost.save();

      res.status(200).json({
        message: "Postagem criada com sucesso",
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erro ao criar postagem",
        success: false,
      });
    }
  }
}

module.exports = { PostController };
