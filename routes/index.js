const express = require("express");
const postRoutes = require("./postRoutes.js");

const routes = (app) => {
  app.use(express.json());

  app.use("/post", postRoutes);
};

module.exports = { routes };
