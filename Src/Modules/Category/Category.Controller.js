const autoBind = require("auto-bind");
const CategoryService = require("./Category.Service");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { CategoryMessage } = require("./Category.Message");

class CategoryController{
    #service
    constructor(){
        autoBind(this);
        this.#service = CategoryService;
    }
    async createCategory(req, res, next){
        try {
            const { name, slug, icon, parent } = req.body;
            await this.#service.createCategory({name, slug, icon, parent});
            return res.status(httpStatus.CREATED).json({
                message: CategoryMessage.Created
            })
        } catch (error) {
            next(error)
        }
    };
    async listOfCatgory(req, res, next){
        try {
            const categories = await this.#service.listOfCategory();
            return res.json(categories);
        } catch (error) {
            next(error)
        }
    }
};

module.exports = new CategoryController()