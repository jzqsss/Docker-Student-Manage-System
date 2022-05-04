import Container from "../models/Container.js";
import ErrorResponse from "../utils/errorResponse.js";
import User from "../models/User.js";
import jwt from 'jsonwebtoken';

export const display_container = async (req, res, next) => { 
    let token;
    if(req.body.headers.Authorization && req.body.headers.Authorization.startsWith("Bearer")){
        //格式 Bearer token(1111)
        token = req.body.headers.Authorization.split(" ")[1];
    }
    if(!token){
        return next(new ErrorResponse(`No authorization to access this route11`, 401));
    }
    try{
        const decode = jwt.verify(token, "process.env.JWT_SECRET");
        const user = await User.findById(decode.id);
        if(!user) return next(new ErrorResponse(`No user found with this id`,404));
        
        const username = user.username;
        const data=await Container.find({username:username}).select("+password");
        console.log("data",data);        
        res.status(200).json(data)
        console.log("data11",data);
    }catch (error){
       next(error);
    }
}