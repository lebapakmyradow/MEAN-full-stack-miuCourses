const express = require("express");
const Router = express.Router();

const courseRouter = require("./courseRouter");
Router.use(process.env.ROUTE_COURSES, courseRouter);

const userRouter = require("./user");
Router.use(process.env.ROUTE_USERS, userRouter);

const loginRouter = require("./login");
Router.use(process.env.ROUTE_LOGIN, loginRouter);

module.exports = Router;