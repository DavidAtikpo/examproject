import express from "express";
import * as dotenv from "dotenv";
import sequelize from "./db/dbConfig.js";
// import adminModel from "./models/adminModel.js"
import studentModel from "./models/studentModel.js"
// import studentRoute from "./routes/studentRoutes.js";
import bodyParser from "body-parser";
import  Cors from "cors";

const app = express();
app.use(Cors ())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();
const port = process.env.PORT;
//user routes
// app.use("/admin", adminRoute);
// app.use("/teacher", teacherRoute);
// app.use("/student", studentRoute);

// app.use('/Images',express.static('./Images'))
try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
  app.listen(port, () => {
    console.log(`App is running on ${port}`);
  });
} catch (error) {
  console.error();
}

(async () => {
  await sequelize.sync();
})();
