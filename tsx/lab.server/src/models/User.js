import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, '请提供用户名']
    },
    password: {
        type: String,
        required: [true, '请提供密码'],
        minlength: 6,
        //select: false //在每次查找之前不让它显示出来
    },
    resetPasswordToken: String, //reset password token
    resetPasswordExpire: Date //过期时间
});

userSchema.methods.getSignedToken = function () {
    return jwt.sign({
        id: this._id
    }, "process.env.JWT_SECRET", {
        expiresIn: "2 days"
    })
};

const User = mongoose.model('User', userSchema);

export default User;

