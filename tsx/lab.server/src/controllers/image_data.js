import Image from "../models/Image.js";
import ErrorResponse from "../utils/errorResponse.js";
export const display_image = async (req, res, next) => { 
    
    try{
        
        const data=await Image.find({name:  {$exists: true}}).select("+password");

        //console.log(data);
        res.status(200).json(data)

    }catch (error){
       next(error);
    }
}