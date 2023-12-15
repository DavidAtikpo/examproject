import sequelize from "../db/dbConfig.js"; 
import  DataTypes  from "sequelize";
import User from "./userModel.js";

const Exam = sequelize.define('Exam', {
  exam_id: {
    type: DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  duration: {
    type: DataTypes.TIME,
    allowNull:false
  },
//   user_id: {
//     type:DataTypes.UUID,
//     allowNull:false,
//     // References: {
//     //     model: "user",
//     //     key: "id",
//     // }
// },
});

Exam.belongsTo(User, { foreignKey: 'user_id' });

export default Exam;
