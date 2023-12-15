import express from "express";
import sequelize from "./db/dbConfig.js";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import studentRouter from "./routes/studentRouter.js";
import teacherRouter from "./routes/teacherRouter.js";
import adminRouter from "./routes/adminRouter.js"
import superAdminRouter from "./routes/superAdminRouter.js"
import questionRouter from "./routes/questionRouter.js"
import refreshRouter from "./routes/refreshRouter.js"
import profileRouter from "./routes/profileRoutter.js"
import Cors from "cors";


const app = express();
app.use(Cors ())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

const port = process.env.PORT;

app.use("/student",studentRouter)
app.use("/teacher",teacherRouter)
app.use("/admin",adminRouter)
app.use("/superAdmin",superAdminRouter)
app.use("/question",questionRouter)
app.use('/refresh',refreshRouter)
app.use('/profile',profileRouter)



try {
  await sequelize.authenticate();
  console.log("connect Sucessfull");
  app.listen(port,() =>{
  console.log(`app is running on ${port}`);
  });
}
catch (error) {
  console.error("Unable to connect to the db",error);
  throw error;
}

(async () => {
  await sequelize.sync();
})();