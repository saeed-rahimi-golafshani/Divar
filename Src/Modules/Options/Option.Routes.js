const { Router } = require("express");
const OptionController = require("./Option.Controller");
const { stringToArray } = require("../../Common/Middleware/StringToArray");

const router = Router();
router.post("/", OptionController.createOption);
router.get("/by-category/:categoryId", OptionController.listOfOptionByCategoryId);
router.get("/:id", OptionController.listOfOptionById);
router.get("/", OptionController.listOfOption)

module.exports = {
    OptionRoutes: router
}