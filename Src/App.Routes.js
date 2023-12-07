const router = require("express").Router()
const { AuthRoutes } = require("./Modules/Auth/Auth.Routes");
const { UserRoutes } = require("./Modules/User/User.Routes");

router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);

module.exports = {
  mainRouter: router
}



