const { Schema, Types } = require("mongoose");

const PostSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    category: {type: Types.ObjectId, ref: "category", required: true},
    province: {type: String, required: true}, // استان
    city: {type: String, required: true}, // شهر
    district: {type: String, required: true}, // محله
    coordinate: {type: [Number], required: true}, // موقعیت مکانی
    images: {type: [String], required: false, default: []}
});

