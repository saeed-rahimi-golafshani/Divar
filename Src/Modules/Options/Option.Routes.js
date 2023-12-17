const { Router } = require("express");
const OptionController = require("./Option.Controller");

const router = Router();
router.post("/", OptionController.createOption);
router.get("/by-category/:categoryId", OptionController.listOfOptionByCategoryId);
router.get("/by-category-slug/:slug", OptionController.listOfOptionByCategorySlug);
router.get("/:id", OptionController.listOfOptionById);
router.delete("/:id", OptionController.removeOptionById);
router.get("/", OptionController.listOfOption);
router.put("/:id", OptionController.updateOptionById);

module.exports = {
    OptionRoutes: router
}