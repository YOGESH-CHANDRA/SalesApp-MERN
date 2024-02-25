require('dotenv').config();
const express = require("express");
const cors= require("cors");
const app = express();
const mongoDb = require ("./DB/connection");
const AppRouter = require("./Routes/saleAppRoute");
const userRouter= require ("./Routes/userRoute")
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/salesData", AppRouter);
app.use("/user", userRouter);

mongoDb()
.then(()=>app.listen(port, ()=>console.log(`Server is running on port no. ${port}`)))
.catch((err)=>console.log("Data base not connected : ", err))
