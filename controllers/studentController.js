import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs"
import nodemailer from"nodemailer"
import crypto from 'crypto'; 
//import refreshToken from "../controllers/refreshTokenController.js"
//student registrion
const registerStudent = async (req, res) => {
  try {
    const addStudent = req.body;
    const password = addStudent.password;
    const confirmPassword = addStudent.confirmPassword;
    const email = addStudent.email;
    //const refreshToken=addStudent.refreshToken;

    // Check if email already exists
    const existingEmail = await userModel.findOne({ where: { email:email } });
    if (existingEmail) {
      return res.status(409).json({ message: "Email is already in use" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(409).json({ message: "Passwords do not match" });
    }

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
    const accessToken=jwt.sign({
      email:user.email,firstName:user.firstName,lastName:user.lastName, user_id:newStudent.user_id
    }, TOKEN_DURATION);

    const refreshToken = jwt.sign({user_id:newStudent.user_id }, REFRESH_DURATION );

    res.cookie("accessToken",accessToken,{
      maxAge:300000,
      httpOnly:true,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Server error" });
  }
};
// login student

const loginStudent = async (req,res,next)=>{
  try {
    // to return token and studentDetails
    
    const token = req.token;
    const refreshToken=req.refreshToken

    
    // const studentDetails = {
    //     id: req.student.id,
    //     email: req.student.email,
    //     firstName: req.student.firstName,
    //     lastName: req.student.lastName,
    //     phoneNumber: req.student.phoneNumber,
      
    // };

    res.status(200).json({ token ,refreshToken});
} catch (error) {
    console.error(error);
    next(error); // Pass the error to the error handling middleware
}

};


// update student

const updateStudent = async (req, res) => {
  try {
    const userId = req.userId;
    const { firstName, lastName, email } = req.body;

    // Check if the user exists
    const student = await userModel.findByPk(userId);
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields if provided in the request
    if (firstName) {
      student.firstName = firstName;
    }
    if (lastName) {
      student.lastName = lastName;
    }
    if (email) {
      student.email = email;
    }

    // Save the updated user to the database
    await student.save();

    return res.status(200).json({ message: "Update successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};



//forgot password
// Include the crypto module

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const existingEmail = await userModel.findOne({ where: { email } });
    if (!existingEmail) {
      return res.status(404).json({ error: 'Email not found' });
    }

    // Generate a unique token
    const token = crypto.randomBytes(20).toString('hex');

    // Update the user's record with the token
    existingEmail.resetPasswordToken = token;
    existingEmail.resetPasswordExpires = Date.now() + 3600000; // Token expiration time (1 hour)

    await existingEmail.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user:'davidatikpo44@gmail.com',
        pass: "vcsh tbep wfsb rcmk",
      },
    });

    const resetLink = `http://localhost:4000/reset-password?token=${token}`;

    const mailOptions = {
      from:'davidatikpo44@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error sending email' });
      }
      res.status(200).json({ message: 'Password reset email sent' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



//reset password
const resetPassword =async(req,res)=>{
  try {
    const email = req.email;
    const token = req.body.token;
    const password = req.body.password;
    // use findOne with a query object to find the user by the token
    const existingEmail =await userModel.findOne({email:email});

    if (existingEmail){
      //const password = req.body.password;
       // assume securePassword is a function that hashes the password securely
      const newPassword = await bcrypt.hash(password);
      existingEmail.password=newPassword;
      const userData= await existingEmail.save();
      // use findByIdAndUpdate to find the user by ID and update the fields 
      // const userData = await userModel.findByPkIdAndUpdate(existingEmail._id,{
      //   $set:{password:newPassword,email:''}},
      //   {new:true});
      
      //Check if userData is not null before sending a response
      if(userData){
        return res.status(201).json({message:"User password has been reset successfully",data:userData,
      });
      }else{
       return res.status(404).json({message:" User not found"});

      }
      }else{
        return res.status(404).json({message:"Ivalid or expired token"});
      }
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal server error"});
  }
};






export default {registerStudent,loginStudent,updateStudent,forgetPassword,resetPassword};