const autoBind = require("auto-bind");
const OptionService = require("./Option.Service");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { optionMessage } = require("./Option.Message");

class OptionController{
    #service
    constructor(){
        autoBind(this);
        this.#service = OptionService
    };
    async createOption(req, res, next){
        try {
            const { title, key, type, enum: list, guid, category, required } = req.body;
            await this.#service.createOption({ title, key, type, enum: list, guid, category, required });
            return res.status(httpStatus.CREATED).json({
                message: optionMessage.Created
            })
            
        } catch (error) {
            next(error)
        }
    };
    async listOfOption(req, res, next){
        try {
            const options = await this.#service.listOfOption();
            return res.json(options)
        } catch (error) {
            next(error)
        }
    };
    async listOfOptionById(req, res, next){
        try {
            const { id } = req.params;
            const option = await this.#service.listOfOptionById(id);
            return res.json(option)
        } catch (error) {
            next(error)
        }
    };
    async listOfOptionByCategoryId(req, res, next){
        try {
            const { categoryId } = req.params;
            const option = await this.#service.listOfOptionByCategoryId(categoryId);
            return res.json(option)
        } catch (error) {
            next(error)
        }
    };
    async listOfOptionByCategorySlug(req, res, next){
        try {
            const { slug } = req.params;
            const option = await this.#service.listOfOptionByCategorySlug(slug);
            return res.json(option);            
        } catch (error) {
            next(error)
        }
    };
    async removeOptionById(req, res, next){
        try {
            const { id } = req.params;
            await this.#service.removeOptionById(id);
            return res.json({
                message: optionMessage.remove
            })
        } catch (error) {
            next(error)
        }
    };
    async updateOptionById(req, res, next){
        try {
            const { id } = req.params;
            const { title, key, type, enum: list, guid, category, required } = req.body;
            await this.#service.updateOptionById(id, { title, key, type, enum: list, guid, category, required });
            return res.json({
                message: optionMessage.update
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new OptionController();