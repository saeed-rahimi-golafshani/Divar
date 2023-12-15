const autoBind = require("auto-bind");
const OptionService = require("./Option.Service");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { optionMessage } = require("./Option.Message");

class OptionController{
    #service
    constructor(){
        autoBind(this);
        this.#service = OptionService
    }
    async createOption(req, res, next){
        try {
            const { title, key, type, enum: list, guid, category } = req.body;
            await this.#service.createOption({ title, key, type, enum: list, guid, category });
            return res.status(httpStatus.CREATED).json({
                message: optionMessage.Created
            })
            
        } catch (error) {
            next(error)
        }
    }
    async listOfOption(req, res, next){
        try {
            const options = await this.#service.listOfOption();
            return res.json(options)
        } catch (error) {
            next(error)
        }
    }
    async listOfOptionById(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async listOfOptionByCategoryId(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new OptionController();