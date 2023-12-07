 const { Router } = require("express");
 const AuthController = require("./Auth.Controller");
const Authorization = require("../../Common/Guard/Authorization.Guard");
 const router = Router();

 router.post("/send-otp", AuthController.sendOTP);
 router.post("/check-otp", AuthController.checkOTP);
 router.get("/logout", Authorization, AuthController.logOut);

 module.exports = {
  AuthRoutes: router
 }