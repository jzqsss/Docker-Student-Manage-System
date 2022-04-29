import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '请提供用户名']
    },
    image_url: {
        type: String,
        required: [true, '请提供镜像名称'],

    },
    description: {
        type: String,   
        required: [true, '请填写镜像描述'], 
    },
    created_at: {
        type: String,           
    },
});



const Image = mongoose.model('Image', imageSchema);

export default Image;

