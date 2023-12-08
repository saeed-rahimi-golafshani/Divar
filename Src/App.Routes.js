const router = require("express").Router()
const { AuthRoutes } = require("./Modules/Auth/Auth.Routes");
const { CategoryRoutes } = require("./Modules/Category/Category.Routes");
const { UserRoutes } = require("./Modules/User/User.Routes");

router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);
router.use("/category", CategoryRoutes);

module.exports = {
  mainRouter: router
}



