import { DataTypes } from 'sequelize';
import sequelize from '../db/dbConfig.js';
import Exam from './examModel.js';

const Question = sequelize.define('Question', {
  question_id: {
    type: DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING, // Adjust as needed
    allowNull: true,
  },
  options: {
    type: DataTypes.STRING, // Store options as JSON for multiple-choice questions
  },
  correct_answer: {
    type: DataTypes.STRING, // Adjust the type based on your needs
  },

//   exam_id: {
//     type:DataTypes.UUID,
//     References: {
//         model: "Exam",
//         key: "id",
//     }
// },

});

Question.belongsTo(Exam, { foreignKey: 'exam_id' });

export default Question;
