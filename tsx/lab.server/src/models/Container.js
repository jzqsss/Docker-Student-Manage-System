import mongoose from "mongoose";


const containerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, '请提供用户名']
    },
    image_url: {
        type: String,
        required: [true, '请提供镜像名称'],
    },
   container_name:{
        type: String,
        required: [true, '请提供容器名']
    },
    container_id:{
        type: String,
        required: [true, '请提供容器ID']
    },
    container_status:{
        type: String,
        required: [true, '请提供容器状态']
    }
});



const Container = mongoose.model('Container', containerSchema);

export default Container;

