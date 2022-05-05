import jwt from 'jsonwebtoken';
import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";
import { exec } from "shelljs";
import Container from "../models/Container.js";
export const docker_run=async (req, res,next) => {
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
        let cmd = "../../cxx/lab run --lab " + lab + " --image " + image;
        let { stdout } = exec(cmd);
        console.log(stdout);
        Container.create({
            username: username,
            image_url: image_url,
            container_name:lab,
            container_id:stdout,
            container_status:'运行',
        });
        return {
        res: 'success',
        }
    }catch (e){
        console.log("error",e);
        return next(new ErrorResponse(`No authorization to access this route`, 401));
    }
}
export const docker_stop=async (req, res,next) => {
    try{
        //解码 验证签名
        const { container_id } = req.body;    
        let cmd = "../../cxx/lab stop --lab " + container_id;
        let { stdout } = exec(cmd);
        console.log("stop");
        Container.updateOne(
            {container_id: container_id},
            {container_status: '停止'},
            function(err, docs){
                if(err) console.log(err);
                console.log('更改成功：' + docs);
            }
        );      
        res.json({res:'success'});
    }catch (e){
        console.log("error",e);
        return next(new ErrorResponse('stop failure'));
    }
}

export const docker_start=async (req, res,next) => {
    try{
        //解码 验证签名
        const { container_id } = req.body;    
        let cmd = "../../cxx/lab start --lab " + container_id;
        let { stdout } = exec(cmd);
        console.log("stop");
        Container.updateOne(
            {container_id: container_id},
            {container_status: '运行'},
            function(err, docs){
                if(err) console.log(err);
                console.log('更改成功：' + docs);
            }
        );      
        res.json({res:'success'});
    }catch (e){
        console.log("error",e);
        return next(new ErrorResponse('start failure'));
    }
}

export const docker_suspand=async (req, res,next) => { 
    try{
        //解码 验证签名
        const { container_id } = req.body;    
        let cmd = "../../cxx/lab suspand --lab " + container_id;
        let { stdout } = exec(cmd);
        Container.updateOne(
            {container_id: container_id},
            {container_status: '挂起'},
            function(err, docs){
                if(err) console.log(err);
                console.log('更改成功：' + docs);
            }
        );      
        res.json({res:'success'});
    }catch (e){
        console.log("error",e);
        return next(new ErrorResponse('suspand failure'));
    }
}

export const docker_unsuspand=async (req, res,next) => {
    try{
        //解码 验证签名
        const { container_id } = req.body;    
        let cmd = "../../cxx/lab unsuspand --lab " + container_id;
        let { stdout } = exec(cmd);
        Container.updateOne(
            {container_id: container_id},
            {container_status: '运行'},
            function(err, docs){
                if(err) console.log(err);
                console.log('更改成功：' + docs);
            }
        );      
        res.json({res:'success'});
    }catch (e){
        console.log("error",e);
        return next(new ErrorResponse('unsuspand failure'));
    }
}

export const docker_remove=async (req, res,next) => {
    try{
        //解码 验证签名
        const { container_id } = req.body;    
        let cmd = "../../cxx/lab remove --lab " + container_id;
        let { stdout } = exec(cmd);
        Container.findOneAndDelete(
            {container_id: container_id},
            function(err, docs){
                if(err) console.log(err);
                console.log('删除成功：' + docs);
            }
        );      
        res.json({res:'success'});
    }catch (e){
        console.log("error",e);
        return next(new ErrorResponse('delete failure'));
    }
}