const autoBind = require("auto-bind");
const OptionModel = require("./Option.Model");
const CategoryModel = require("./../Category/Category.Model");
const createHttpError = require("http-errors");
const { optionMessage } = require("./Option.Message");
const { default: slugify } = require("slugify");

class OptionService{
    #model
    #categoryModel
    constructor(){
        autoBind(this);
        this.#model = OptionModel;
        this.#categoryModel = CategoryModel;
    }
    async createOption(optionDto){
        const category = await this.checkExistById(optionDto.category);
        optionDto.category = category._id;
        optionDto.key = slugify(optionDto.key, {trim: true, replacement: "_", lower: true});
        await this.alreadyExistByCategoryAndKey(optionDto.key, category._id);
        if(optionDto?.enum && typeof optionDto.enum === "string"){
            optionDto.enum = optionDto.enum.split(" ");
        } else if(Array.isArray(optionDto.enum)) optionDto.enum = []
        const option = await this.#model.create(optionDto);
        return option
        
    }
    async listOfOption(){
        const orders = await this.#model.find({},{__v: 0},{sort: {_id: -1}}).populate([
            {path: "category", select: {name: 1, slug: 1}}
        ]);
        return orders
    }
    async listOfOptionById(){
    }
    async listOfOptionByCategoryId(){
    }
    async checkExistById(id){
        const category = await this.#categoryModel.findById(id)
        if(!category) throw new createHttpError.NotFound(optionMessage.NotFound);
        return category;
    }
    async alreadyExistByCategoryAndKey(key, category){
        const isExist = await this.#model.findOne({category, key});
        if(isExist) throw new createHttpError.Conflict(optionMessage.AlreadyExist);
        return null;
    }
}

module.exports = new  OptionService();