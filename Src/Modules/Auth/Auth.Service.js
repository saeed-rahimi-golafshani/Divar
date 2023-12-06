const autoBind = require("auto-bind");
const UserModel = require("../User/User.Model");
const createHttpError = require("http-errors");
const AuthMessage = require("./Auth.Mesaages");
const { randomInt } = require("crypto");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

class AuthService{
  #model;
  constructor(){
    autoBind(this);
    this.#model = UserModel
  }
  async sendOTP(mobile){
    const user = await this.#model.findOne({mobile});
    const now = new Date().getTime();
    const otp = {
      code: randomInt(10000, 99999),
      expiresIn: now + (1000*60*2)
    };
    if(!user){
      const newUser = await this.#model.create({mobile, otp});
      return newUser
    }
    if(user.otp && user.otp.expiresIn > now){
      throw new createHttpError.BadRequest(AuthMessage.otpCodeNotExpired)
    }
    user.otp = otp;
    await user.save();
    return user;
    
    
  };
  async checkOTP(mobile, code){
    const user = await this.checkExistUserByMobile(mobile);
    const now = new Date().getTime();
    if(user?.otp?.expiresIn < now) throw new createHttpError.Unauthorized(AuthMessage.otpCodeExpired);
    if(user?.otp?.code != code) throw new createHttpError.Unauthorized(AuthMessage.otpCodeIsIncorrect);
    if(!user.verifiedMobile){ 
      user.verifiedMobile = true;
    }
    const accessToken = this.signToken({mobile, id: user._id});
    user.accessToken = accessToken;
    await user.save();
    return accessToken
  };
  async checkExistUserByMobile(mobile){
    const user = await this.#model.findOne({mobile});
    if(!user) throw new createHttpError.NotFound(AuthMessage.NotFound);
    return user
  };
  signToken(payload){
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "1y"});
  }
};

module.exports = new AuthService();