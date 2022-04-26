import mongoose from "mongoose";
//console.log("打印"+process.env.MONGO_URI);
const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/myApp', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('mongoDB connected!')
}

export default connectDB;
