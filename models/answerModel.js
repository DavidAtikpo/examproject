import  DataTypes  from 'sequelize';
import sequelize from '../db/dbConfig.js';
import Question from './questionModel.js';
import User from './userModel.js';

const Answer = sequelize.define('Answer', {
  answer_id: {
    type: DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    primaryKey: true,
  },
  // chosen_option: {
  //   type: DataTypes.STRING, 
  // },
  text_answer: {
    type: DataTypes.TEXT,
  },
});

Answer.belongsTo(Question, { foreignKey: 'question_id' });
Answer.belongsTo(User, { foreignKey: 'user_id' });

export default Answer;
