import  DataTypes  from 'sequelize';
import sequelize from '../db/dbConfig.js';
import Exam from './examModel.js';
import User from './userModel.js';
import Answer from './answerModel.js';

const ExamResult = sequelize.define('ExamResult', {
  id: {
    type: DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    primaryKey: true,
  },
  score: {
    type: DataTypes.INTEGER,
  },
  // submission_time: {
  //   type: DataTypes.DATE,
  // },
  // status: {
  //   type: DataTypes.ENUM('completed', 'in-progress'), 
  // },
});

ExamResult.belongsTo(Exam, { foreignKey: 'exam_id' });
ExamResult.belongsTo(User, { foreignKey: 'user_id' });

export default ExamResult;
