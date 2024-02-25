const express = require("express");
const User = require("../Modals/userModal");
const {userSignIn,userRegister} = require("../Controllers/userController")

const userRouter = express.Router();


userRouter.route("/signin").post(userSignIn);
userRouter.route("/register").post(userRegister);




module.exports= userRouter;
