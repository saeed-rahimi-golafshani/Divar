const router = require("express").Router()
const { AuthRoutes } = require("./Modules/Auth/Auth.Routes");

router.use("/auth", AuthRoutes);

module.exports = {
  mainRouter: router
}



