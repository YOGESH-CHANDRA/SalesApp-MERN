const mongoose = require("mongoose");


const mongoDb= async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DATABASE_NAME}`)
        console.log("Data Base connection successful")
    } catch (error) {
        console.log("Database not connected : ", error);
        process.exit(0);
    }
}
 
module.exports = mongoDb;