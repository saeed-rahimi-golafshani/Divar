const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

async function main(){
  const app = express();
  const port = process.env.PORT;
  const baseUrl = process.env.BASEURL
  require("./Src/Config/Mongoose.Config");

  app.listen(3000, () =>{
    console.log(`Server: ${baseUrl}:${port}`);
  })
};

main()