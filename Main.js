const express = require("express");
const dotenv = require("dotenv");
const swaggerConfig = require("./Src/Config/Swagger.Config");
const { mainRouter } = require("./Src/App.Routes");
const NotFoundHandler = require("./Src/Common/Exception/NotFound.handler");
const AllExceptionHandler = require("./Src/Common/Exception/All_exception.handler");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
dotenv.config();

async function main(){
  const app = express();
  const port = process.env.PORT;
  const baseUrl = process.env.BASEURL;
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(cookieParser(process.env.TOKEN_SECRET_KEY));
  app.use(cors());
  app.use(morgan("dev"));
  require("./Src/Config/Mongoose.Config");
  // swaggerConfig(app);
  app.use(mainRouter);
  NotFoundHandler(app);
  AllExceptionHandler(app);

  app.listen(3000, () =>{
    console.log(`Server: ${baseUrl}:${port}`);
  })
};

main()