import examModel from '../models/examModel.js';
//import userModel from '../models/userModel.js'; 
import questionModel from '../models/questionModel.js'

// Create a new exam
const  createExam = async (req, res) => {
    try {
      const exam = req.body;
      const user_id = req.userId;
          exam['user_id'] = user_id;

      const newExam = await examModel.create(exam);
     return res.status(201).json({message:"Successful",newExam});

    } catch (error) {
      console.log(error);
     return res.status(500).json({ error: error.message });
    }
  };

  // Get all exams
 const  getAllExams = async (req, res) => {
    try {
      
      const exams = await examModel.findAll();
      if(exams){
        return res.status(200).json({message:"Successful",exams});
      }else{
        return res.status(404).json({message:"Not found"});
      }
     
    } catch (error) {
      console.log(error);
     return res.status(500).json({message:"server error"});
    }
  };

  // Get a specific exam by ID
//  const getExamById= async (req, res) => {
//     const examId = req.params.id;
//     try {
//       const exam = await examModel.findByPk(examId);
//       if (exam) {
//        return res.status(200).json(exam);
//       } else {
//        return res.status(404).json({ message: 'Exam not found' });
//       }
//     } catch (error) {
//      return res.status(500).json({ error: error.message });
//     }
//   };

 // Update a specific exam by ID

 const updateExam = async (req, res) => {
  try {
    const exam_id = req.params.exam_id;
    const user_id = req.userId;
    const { title, description, start_time, end_time, duration } = req.body;

    // Check if the exam exists for the specified user
    const existingExam = await examModel.findOne({
      where: { exam_id: exam_id, user_id: user_id }
    });

    if (!existingExam) {
      return res.status(404).json({ message: 'Exam not found or unauthorized to update' });
    }

    // Update exam properties if provided
    if (title) {
      existingExam.title = title;
    }
    if (description) {
      existingExam.description = description;
    }
    if (start_time) {
      existingExam.start_time = start_time;
    }
    if (end_time) {
      existingExam.end_time = end_time;
    }
    if (duration) {
      existingExam.duration = duration;
    }

    // Save the updated exam
    await existingExam.save();

    res.status(200).json({ message: "Exam updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteExam = async (req, res) => {
  try {
    const exam_id = req.params.exam_id;
    const user_id = req.userId;

    // Check if the exam exists for the specified user
    const existingExam = await examModel.findOne({
      where: { exam_id: exam_id, user_id: user_id }
    });

    if (!existingExam) {
      return res.status(404).json({ message: 'Exam not found or unauthorized to delete' });
    }

    // Find and delete associated questions
    const existingQuestions = await questionModel.findAll({
      where: { exam_id: exam_id }
    });

    await Promise.all(existingQuestions.map(async (question) => {
      await question.destroy();
    }));

    // Delete the exam
    await existingExam.destroy();

    res.status(200).json({ message: 'Exam and associated questions deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};



// const getAllExams = async (req, res) => {
//   const allExams = await exam.findAll();
//   const examdetail = allExams.map((detail) => {
//     return {
//       exam_id: detail.id,
//       examName: detail.examName,
//       duration: detail.duration,
//       examiner: detail.teacher_id,
//     };
//   });
//   return res.status(200).json({ Exam: examdetail });
// }
export default {createExam,getAllExams,updateExam,deleteExam};
