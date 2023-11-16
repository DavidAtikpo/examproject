import sequelize from "../db/dbConfig.js";
import  DataTypes  from "sequelize";

const student = sequelize.define("student",
{
  id:{
    type:DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    primaryKey:true,
    allowNull:false
  },
  firstName:{
    type:DataTypes.STRING,
    allowNull:false
  },

  lastName:{
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
}, {paranoid:true});

export default student;