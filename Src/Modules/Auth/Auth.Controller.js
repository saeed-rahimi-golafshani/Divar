const Cookei_Env = require("../../Common/Constant/Cookie.enum");
const Node_Env = require("../../Common/Constant/Env.enum");
const AuthMessage = require("./Auth.Mesaages");
const authService = require("./Auth.Service");
const autoBind = require("auto-bind");

class AuthController{
  #service;
  constructor(){
    autoBind(this);
    this.#service = authService;
  } 
  async sendOTP(req, res, next){
    try {
      const { mobile } = req.body;
      await this.#service.sendOTP(mobile);
      return res.json({
        message: AuthMessage.sendOtpSuccessfuly
      })
    } catch (error) {
      next(error)
    }
  }
  async checkOTP(req, res, next){
    try {
      const { mobile, code } = req.body;
      const token = await this.#service.checkOTP(mobile, code);
      return res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === Node_Env
      }).status(200).json({
        message: AuthMessage.LogingSuccessFully,
        token
      })
    } catch (error) {
      next(error)
    }
  };
  async logOut(req, res, next){
    try {
      return res.clearCookie(Cookei_Env.AccessToken).status(200).json({
        message: AuthMessage.logOutSuccessfully
      })
    } catch (error) {
      next(error)
    }
  }
};
 
module.exports = new AuthController();