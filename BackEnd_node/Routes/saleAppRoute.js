const express = require ("express");

const Auth = require("../Middleware/Auth-middleware");

const AppRouter=express.Router();
const saleAppController =require ("../Controllers/saleAppController");



AppRouter.route("/").get(Auth, saleAppController.getData);
AppRouter.route("/").post(Auth, saleAppController.addData);
AppRouter.route("/top5sales").get(Auth, saleAppController.top5sales);
AppRouter.route("/totalRevenue").get( Auth, saleAppController.totalRevenue);




module.exports = AppRouter;