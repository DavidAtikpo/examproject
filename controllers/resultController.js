import resultModel from "../models/resultModel.js"


const createExamResult = async (req, res) => {
  try {
    const { exam_id, user_id, score, submission_time, status } = req.body;

    const newExamResult = await resultModel.create({
      exam_id,
      user_id,
      score,
      submission_time,
      status,
    });

    return res.status(201).json({ message: 'Exam result created successfully', newExamResult });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

export default {createExamResult}