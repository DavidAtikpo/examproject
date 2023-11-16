import sequelize from "../db/dbConfig.js";
import  DataTypes from "sequelize";

const teacher = sequelize.define("teacher",{
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
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false
  },
  confirmPassword:{
    type:DataTypes.STRING,
    allowNull:false
  },
  phoneNumber:{
    type:DataTypes.STRING,
    allowNull:false
  }
},{paranoid:true});

export default teacher;