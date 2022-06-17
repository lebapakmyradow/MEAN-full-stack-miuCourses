const express = require("express");
const Router = express.Router();
const controllerUser = require("../controllers/user.controller");

Router.route("/")
    .post(controllerUser.addOne);

module.exports = Router;