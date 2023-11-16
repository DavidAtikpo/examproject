import sequelize from "../db/dbConfig.js";
import { DataTypes } from "sequelize";

const admin = sequelize.define("admin",{

  id:{
    type:DataTypes.UUID,
    allowNull:DataTypes.UUIDV4,
    primaryKey:true
  },
  firstName:{
    type:DataTypes.STRING,
    allowNull:false
  },
  lastName:{
    type:DataTypes.STRING,
    allowNull:false
  }
},{paranoid:true});

export default admin;