import sequelize from "../db/dbConfig.js";
import  DataTypes  from "sequelize";


const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  
  },
  lastName:{
    type:DataTypes.STRING,
    allowNull:false
  },
  
  email: {
    type: DataTypes.STRING,
    allowNull:true

  },
  phoneNumber:{
    type:DataTypes.STRING,
    allowNull:true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  confirmPassword:{
    type:DataTypes.STRING,
    allowNull:true
  },
 
  role: {
    type: DataTypes.ENUM('student', 'teacher', 'admin','superAdmin'),
    allowNull:true,
  },
  examRegist:{
    type:DataTypes.STRING,
    allowNull:true
  },
  supended:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
  },
  refreshToken: {
    type: DataTypes.STRING(1000), 
    allowNull: true,
  },
  // profile_picture: {
  //   type: DataTypes.STRING,
  // },
},{paranoid:true});

export default User;
