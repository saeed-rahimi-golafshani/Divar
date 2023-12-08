const { Router } = require("express");
const CategoryController = require("./Category.Controller");

const router = Router();
router.post("/", CategoryController.createCategory)
router.get("/find", CategoryController.listOfCatgory)

module.exports = {
    CategoryRoutes: router
}