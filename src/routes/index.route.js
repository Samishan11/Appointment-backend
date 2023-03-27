const Router = require("express").Router();
const USER_ROUTE = require('./user.route/user.route');

// rotues
Router.use(USER_ROUTE)
module.exports = Router;