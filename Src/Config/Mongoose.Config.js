const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Connected To DB...");
}).catch( err => {
  console.log(err?.message ?? "Feiled DB Connection...");
})