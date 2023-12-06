 const { Router } = require("express");
 const AuthController = require("./Auth.Controller");
 const router = Router();

 router.post("/send-otp", AuthController.sendOTP);
 router.post("/check-otp", AuthController.checkOTP);

 module.exports = {
  AuthRoutes: router
 }