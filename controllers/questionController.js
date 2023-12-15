import questionModel from "../models/questionModel.js"
import examModel from "../models/examModel.js"


const createQuestion = async(req,res)=>{
  try {

    const questionBody = req.body;
    const {exam_id} = req.params;

    const existingExm = await examModel.findOne({where:{exam_id}});
    if (!existingExm){
      return res.status(404).json({message:"the exam not exist"})
    }
    questionBody.exam_id = exam_id;

    const addQuestion = await questionModel.create(questionBody);
    if(addQuestion){
      return res.status(200).json({message:"Successful"})
    }
  
  } catch (error) {
    console.log(error);
    return res.status({message:"Internal server error"});
  }
};


// get 10 question for exam
const getExamQuestion = async (req, res) => {
  try {
    //const { exam_id } = req.params;
    const questions =await questionModel.findAll()
    const examQuestion = questions.map(detail=>{return{question_id:detail.question_id,quetion:detail.text,option:detail.options.split("/")
  }})
    //const question = await questionModel.findAll({attributes:['question_id','text','options'] });

    if (examQuestion.length > 0) {
      return res.status(200).json({ message: "Successful", examQuestion });
    } else {
      return res.status(404).json({ message: "No questions found for the specified exam_id" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server l'error",error });
  }
};


// getAllQuiz 

const getAllQuestion = async(req,res)=>{
  try {
    const allQuestions = await questionModel.findAll(req.body);
    if(allQuestions){
      return res.status(200).json({message:"Successful",allQuestions});
    }else{
      return res.status(404).json({message:"Not found"})
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"server error"});
  }
 

};

const deleteQuestion = async (req, res) => {
  try {
    const question_id = req.params.question_id;
    const user_id = req.userId;

    // Check if the exam exists for the specified user
    const existingQuestion = await examModel.findOne({
      where: { question_id:question_id, user_id: user_id }
    });

    if (!existingQuestion) {
      return res.status(404).json({ message: 'Exam not found or unauthorized to delete' });
    }

    // Delete the exam
    await existingQuestion.destroy();

    res.status(200).json({ message: 'Exam deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


export default {createQuestion,getAllQuestion,getExamQuestion,deleteQuestion}