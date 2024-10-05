const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

const post = mongoose.model("posts", postSchema);

module.exports = { post };
