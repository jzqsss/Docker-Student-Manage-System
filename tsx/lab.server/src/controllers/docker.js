import jwt from 'jsonwebtoken';
import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";
import { exec } from "shelljs";
import Container from "../models/Container.js";
export const docker_start=async (req, res,next) => {
    let token;
    console.log(req.body);
    if(req.body.headers.Authorization && req.body.headers.Authorization.startsWith("Bearer")){
        //格式 Bearer token(1111)
        token = req.body.headers.Authorization.split(" ")[1];
    }

    if(!token){
        return next(new ErrorResponse(`No authorization to access this route11`, 401));
    }

    try{
        //解码 验证签名

        const { lab, image_url } = req.body;
        const image = image_url;
        const decode = jwt.verify(token, "process.env.JWT_SECRET");
        const user = await User.findById(decode.id);
        if(!user) return next(new ErrorResponse(`No user found with this id`,404));
        
        const username = user.username;        
        //return res.send({ res: "success" });
        let cmd = "../../cxx/lab start --lab " + lab + " --image " + image;
        let { stdout } = exec(cmd);
        console.log(stdout);
        Container.create({
            username: username,
            image_url: image_url,
            container_name:lab,
            container_id:stdout,
        });
        return {
        res: success,
        }
    }catch (e){
        return next(new ErrorResponse(`No authorization to access this route`, 401));
    }


}