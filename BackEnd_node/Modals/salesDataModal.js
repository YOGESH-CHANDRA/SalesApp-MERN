const mongoose = require("mongoose")

const salesDataSchema= new mongoose.Schema({
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:[true, "user id is required"]
  },
    salesId:{
        type:String,
        required: [true, "sales id required"]
    },
    
    productName:{
        type:String,
        required: [true, "productName required"]
    },
    quantity:{
        type:Number,
        required: [true, "quantity required"]
    },
    salesAmount:{
        type:Number,
        required: [true, "salesAmount required"]
    }},
    {
        timestamps:true
    }

)

const SalesData= mongoose.model("salesdata",salesDataSchema)

module.exports =SalesData;