const autoBind = require("auto-bind");
const OptionModel = require("./Option.Model");
const CategoryModel = require("./../Category/Category.Model");
const createHttpError = require("http-errors");
const { optionMessage } = require("./Option.Message");
const { default: slugify } = require("slugify");
const CategoryService = require("../Category/Category.Service");
const { isTrue, isFalse } = require("../../Common/Utils/Functions");
const { isValidObjectId } = require("mongoose");

class OptionService{
    #model;
    #categoryService;
    constructor(){
        autoBind(this);
        this.#model = OptionModel;
        this.#categoryService = CategoryService;
    }
    async createOption(optionDto){
        const category = await this.#categoryService.checkExistById(optionDto.category);
        optionDto.category = category._id;
        optionDto.key = slugify(optionDto.key, {trim: true, replacement: "_", lower: true});
        await this.alreadyExistByCategoryAndKey(optionDto.key, category._id);
        if(optionDto?.enum && typeof optionDto.enum === "string"){
            optionDto.enum = optionDto.enum.split(" ");
        } else if(!Array.isArray(optionDto.enum)) optionDto.enum = []
        if(isTrue(optionDto?.required)) optionDto.required = true;
        if(isFalse(optionDto?.required)) optionDto.required = false;
        const option = await this.#model.create(optionDto);
        return option
        
    };
    async listOfOption(){
        const orders = await this.#model.find({},{__v: 0},{sort: {_id: -1}}).populate([
            {path: "category", select: {name: 1, slug: 1}}
        ]);
        return orders
    };
    async listOfOptionById(id){
        return await this.checkExistById(id);
    };
    async listOfOptionByCategoryId(catId){
        return await this.#model.find({category: catId}, {__v: 0}).populate([
            {path: "category", select: {name: 1, slug: 1}}
        ]);
    };
    async listOfOptionByCategorySlug(slug){
        const options = await this.#model.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"  
                }                
            },
            {
                $unwind: "$category"
            },
            {
                $addFields: {
                    categoryName: "$category.name",
                    categorySlug: "$category.slug",
                    categoryIcon: "$category.icon"
                }
            },
            {
                $project: {
                    category: 0,
                    __v: 0
                    // "category._id": 0,
                    // "category.parent": 0,
                    // "category.parents": 0,
                    // "category.slug": 0,
                }
            },
            {
                $match: {
                    categorySlug: slug
                }
            }
        ]);
        return options
    };
    async removeOptionById(id){
        await this.checkExistById(id);
        return await this.#model.deleteOne({_id: id});
    }
    async checkExistById(id){
        const option = await this.#model.findById(id, {__v: 0});
        if(!option) throw new createHttpError.NotFound(optionMessage.NotFound);
        return option
    };
    async alreadyExistByCategoryAndKey(key, category){
        const isExist = await this.#model.findOne({category, key});
        if(isExist) throw new createHttpError.Conflict(optionMessage.AlreadyExist);
        return null;
    };
    async updateOptionById(id, optionDto){
        const existOption = await this.checkExistById(id);
        if(optionDto.category && isValidObjectId(optionDto.category)){
            const category = await this.#categoryService.checkExistById(optionDto.category);
            optionDto.category = category._id;
        } else {
            delete optionDto.category
        }
        if(optionDto.slug){
            optionDto.key = slugify(optionDto.key, {trim: true, replacement: "_", lower: true});
            let categoryId = existOption.category;
            if(optionDto.category) categoryId = optionDto.category;
            await this.alreadyExistByCategoryAndKey(optionDto.key, categoryId);
        }
        if(optionDto?.enum && typeof optionDto.enum === "string"){
            optionDto.enum = optionDto.enum.split(" ");
        } else if(!Array.isArray(optionDto.enum)) delete optionDto.enum;
        if(isTrue(optionDto?.required)) optionDto.required = true;
        else if(isFalse(optionDto?.required)) optionDto.required = false;
        else delete optionDto.required
        return await this.#model.updateOne({_id: existOption._id}, {$set: optionDto});
    };
}

module.exports = new  OptionService();