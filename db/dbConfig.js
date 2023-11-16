import  Sequelize  from "sequelize";
import * as dotenv from "dotenv";

const sequelize= new Sequelize(
  process.env.DB_NAME,
  process.env.USER_NAME,
  process.env.PASSWORD,
  {
  host:process.env.HOST,
  dialect: "mysql",
  logging: false
  }
);

export default sequelize;