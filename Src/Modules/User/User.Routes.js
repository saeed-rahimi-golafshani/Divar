const { Router } = require("express");
const UserController = require("./User.Controller");
const Authorization = require("../../Common/Guard/Authorization.Guard");
const router = Router();

 router.get("/whoami", Authorization, UserController.whoami);

 module.exports = {
  UserRoutes: router
 }