import mongoose from "mongoose";

const connectDB = async (url) => {
    try {
        await mongoose.connect(url)
        console.log("Base de datos conectada")
    } catch(error) {
        console.log(error)
    }
    
    
}
export default connectDB