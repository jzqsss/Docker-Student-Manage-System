import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";



export const login = async (req, res, next) => { 
    // res.send('Login route');
    const { username, password } = req.body;
    console.log(username," ",password);
    if(!username || !password) return next(new ErrorResponse(`please provide email or password`, 400));
    try{
        const user = await User.findOne({ username }).select("+password"); //选出password
        console.log(user);
        if(!user) return next(new ErrorResponse(`Invalid credentials,用户名不存在`, 401)); //user not found
        //比较密码
        if(user.password !== password) return res.send({message:"密码错误"});


        //创建token
        sendToken(user,200,res);
    }catch (error){
       next(error);
    }
}

export const register = async (req, res, next) => {
    const { username, password } = req.body;
    try{
      const user = await User.create({
          username,
          password
      });
      sendToken(user,201,res);
    }catch (e){
        next(e);
    }
}



const sendToken = async (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({
        success: true,
        token
    })
}


// User.create({
//     username:'itecgo',
//     password:'123456'
// })
