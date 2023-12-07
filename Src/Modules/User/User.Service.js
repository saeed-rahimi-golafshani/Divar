const autoBind = require("auto-bind");
const UserModel = require("./User.Model");
const dotenv = require("dotenv");
dotenv.config();

class UserService{
  #model;
  constructor(){
    autoBind(this);
    this.#model = UserModel
  }
 
};

module.exports = new UserService();