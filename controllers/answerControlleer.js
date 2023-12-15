import answerModel from "../models/answerModel.js"
import resultModel from "../models/resultModel.js";
import questionModel from "../models/questionModel.js"
import Op from "sequelize"
// const createAnswer = async (req, res) => {
//   try {
//     const { question_id, user_id, chosen_option, text_answer } = req.body;

//     const newAnswer = await answerModel.create({
//       question_id,
//       user_id,
//       chosen_option,
//       text_answer,
//     });

//     return res.status(201).json({ message: 'Answer created successfully', newAnswer });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: error.message });
//   }
// };

//student should user the questions

const answerQuestion = async (req, res) => {
  try {
    const { question_id } = req.params;
    const user_id = req.userId;
    const answerBody = req.body;
    answerBody.question_id = question_id;
    answerBody.user_id = user_id;

    // Check if an answer exists for the question
    const existAnswer = await answerModel.findOne({ where: { question_id: question_id } });

    if (!existAnswer) {
      // Create a new answer
      await answerModel.create(answerBody);
      // res.status(200).json({ message: "answer created" });
    } else {
      // Update the existing answer
     const updated= await answerModel.update(answerBody, { where: { question_id: question_id } });
      // return res.status(200).json({ message: "updated successfully" });
    }

    // Get the exam_id associated with the question
    const questionInfo = await questionModel.findOne({ where: { question_id } });

    // if (!questionInfo) {
    //   return res.status(404).json({ message: "Question not found" });
    // }

    const exam_id = questionInfo.exam_id;
    answerBody.exam_id = exam_id;

    const resultInfo = await resultModel.findOne({ where: { exam_id } });
    //const updated =await answerModel.update(answerBody,{where:{question_id:question_id}})

    // Check if the answer is correct and update the result table
    if (answerBody.text_answer == questionInfo.correct_answer) {
      if (resultInfo && resultInfo.exam_id == questionInfo.exam_id) {
        answerBody.score += 1;
        await resultModel.increment('score', { where: { exam_id: exam_id } });
        return res.status(200).json({ message: "your mark + 1" });
      }

      answerBody.score = 1;
      answerBody.user_id = user_id;
      await resultModel.create(answerBody);
      return res.status(200).json({ message: "you have One mark" });
    } 
    
    if(updated){
      if(!answerBody.text_answer==questionInfo.correct_answer){
        answerBody.score -= 1;
          await resultModel.decrement('score', { where: { exam_id: exam_id } });
         return res.status(200).json({ message: "your mark - 1" });
      }
    }
    
    
    // else {
    //   // Check if resultInfo exists and has the correct exam_id before decrementing
    //   if (resultInfo && resultInfo.exam_id == questionInfo.exam_id) {
    //     answerBody.score -= 1;
    //     await resultModel.decrement('score', { where: { exam_id: exam_id } });
    //     return res.status(200).json({ message: "your mark - 1" });
    //   } else {
    //     // If the answer is incorrect and resultInfo doesn't exist or has a different exam_id
    //     answerBody.score = 0;
    //     await resultModel.create(answerBody);
    //     return res.status(200).json({ message: "your mark is 0" });
    //   }
    // }

    // Handle other cases if needed

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error" });
  }
};


 const studentResult = async(req,res)=>{
  const exam_id=req.params;
  const user_id= req.userId
  const finalResult =await examModel.findAll({where:{score:1,user_id:user_id}}).length
  
  return res.status(200).json({message:`${(finalResult*100/20)}`})
 }

export default {answerQuestion,studentResult};