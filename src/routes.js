const express = require("express");
const devController = require("./controllers/DevController");
const likeController = require("./controllers/LikeController");

const routes = express.Router();

routes.post("/devs", devController.store);
routes.post("/devs/:devId/likes", likeController.store);

module.exports = routes;
