import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs"



const registerAdmin = async(req,res)=>{
  try {
    const addAdmin = req.body;

    const password = addAdmin.password;
    const hashPassword = await bcrypt.hash(password,10);
     addAdmin.password = hashPassword;

    // const phoneNumber=addTeacher.phoneNumber;
       const email = addAdmin.email;
       const existingEmail = await userModel.findOne({where:{email}});
       if(existingEmail){
        return res.status(201).json({message:"somebody using this email allready"});
        };
     addAdmin.role = "admin";
    const newAdmin = await userModel.create(addAdmin);
    if(newAdmin){
      return res.status(200).json({message:"your registration has done successlly go to the next"})
     };
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"server error"});
  };
}


//admin login


const loginAdmin = async (req,res,next)=>{
  try {
    // to return token and studentDetails
    const token = req.token;
    const adminDetails = {
        id: req.admin.id,
        email: req.admin.email,
        firstName: req.admin.firstName,
        lastName: req.admin.lastName,
      
    };

    res.status(200).json({ token, student: adminDetails });
} catch (error) {
    console.error(error);
    next(error); // Pass the error to the error handling middleware
}

};
// const loginAdmin = async(req,res)=>{
//   try {
//     const {username, code} = req.body;
//     // find the admin  by username and code
//     const admin = await userModel.findOne({where:{username, code}});
//     if(!admin){
//       return res.status(401).json({message:"Invalid credentials"});
//     }
//   } catch (error) {
//     return res.status(500).json({message:"Error"});
//   }
// };

//get All student

const getAllStudent = async (req,res)=>{
  try {
    const student = await userModel.findAll({where:{role:'student'}});
    if(!student){
      return res.status(404).json({message:"student not found"});
    }else{
      return res.status(200).json({message:"Successful",student});
    };

  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"server error"});
  }
};
// get All teachers


const getAllTeacher = async (req,res)=>{
  try {
    const teacher = await userModel.findAll({where:{role:'teacher'}});
    if(!teacher){
      return res.status(404).json({message:"student not found"});
    }else{
      return res.status(200).json({message:"Successful",teacher});
    };

  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"server error"});
  }
};
export default {registerAdmin,loginAdmin,getAllTeacher,getAllStudent};