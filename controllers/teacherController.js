import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs"
import token from "../middleware/authUser.js"
import nodemailer from"nodemailer"
import crypto from 'crypto'; 
//student registrion

const registerTeacher = async (req, res) => {
  try {
    const addStudent = req.body;
    const password = addStudent.password;
    const confirmPassword = addStudent.confirmPassword;
    const email = addStudent.email;

    // Check if email already exists
    const existingEmail = await userModel.findOne({ where: { email:email } });
    if (existingEmail) {
      return res.status(200).json({ message: "Email is already in use" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(409).json({ message: "Passwords do not match" });
    }
   
    // const verifyPhoneNumber= await userModel.findOne({where:{phoneNumber}})
    // if(!verifyPhoneNumber){
    //     return res.status(401).json({message:"phone number already used"})
    // }
    // Hash passwords
    const hashPassword = await bcrypt.hash(password, 10);
    const hashConfirmPassword = await bcrypt.hash(confirmPassword, 10);

    addStudent.password = hashPassword;
    addStudent.confirmPassword = hashConfirmPassword;
    addStudent.role = "student";

    // Create new student
    const newStudent = await userModel.create(addStudent);

    if (newStudent) {
      return res.status(201).json({ message: "Registration successful" });
    } else {
      return res.status(400).json({ message: "Failed to register student" });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Server error" });
  }
};

// login student

const loginTeacher = async (req,res,next)=>{
  try {
    // to return token and studentDetails
    const token = req.token;
    // const teacherDetails = {
    //     id: req.teacher.id,
    //     email: req.teacher.email,
    //     firstName: req.teacher.firstName,
    //     lastName: req.teacher.lastName,
    //     phoneNumber: req.teacher.phoneNumber,
      
    // };

    res.status(200).json({ token,});
} catch (error) {
    console.error(error);
    next(error); // Pass the error to the error handling middleware
}

};


// update student

const updateTeacher = async (req, res) => {
  try {
    const userId = req.userId;
    const { firstName, lastName, email } = req.body;

    // Check if the user exists
    const teacher = await userModel.findByPk(userId);
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields if provided in the request
    if (firstName) {
      teacher.firstName = firstName;
    }
    if (lastName) {
      teacher.lastName = lastName;
    }
    if (email) {
      teacher.email = email;
    }

    // Save the updated user to the database
    await teacher.save();

    return res.status(200).json({ message: "Update successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
export default {loginTeacher,registerTeacher,updateTeacher}