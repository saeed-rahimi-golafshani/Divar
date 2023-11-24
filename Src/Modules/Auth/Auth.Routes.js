 const { Router } = require("express");
 const AuthController = require("./Auth.Controller");
 const router = Router();

 router.post("/send_otp", AuthController.sendOTP);
 router.post("/check_otp", AuthController.checkOTP);

 module.exports = {
  AuthRoutes: router
 }