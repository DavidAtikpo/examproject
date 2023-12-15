import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs"



const registerSuperAdmin = async(req,res)=>{
  try {
    const addSuperAdmin = req.body;

    // const password = addSuperAdmin.password;
    // const hashPassword = await bcrypt.hash(password,10);
    //  addSuperAdmin.password = hashPassword;

    // const phoneNumber=addSuperAdmin.phoneNumber;
    // const email = addSuperAdmin.email;
    // const existingEmail = await userModel.findOne({where:{email}});
    // if(existingEmail){
      // return res.status(201).json({message:"somebody using this email allready"});
      // };
     addSuperAdmin.role = "superAdmin";
    const newSuperAdmin = await userModel.create(addSuperAdmin);
    if(newSuperAdmin){
      return res.status(200).json({message:"your registration has done successlly go to the next"})
     };
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"server error"});
  };
}
const loginSuperAdmin = async (req,res,next)=>{
  try {
    // to return token and studentDetails
    const token = req.token;
    const superAdminDetails = {
        //id: req.superAdmin.id,
        // email: req.superAdmin.email,
        //firstName: req.superAdmin.firstName,
        // lastName: req.superAdmin.lastName
        
      
    };

    res.status(200).json({ token, superAdmin: superAdminDetails });
} catch (error) {
    console.error(error);
    next(error); // Pass the error to the error handling middleware
}

};

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
// get all admin

const getAllAdmin = async (req,res)=>{
  try {
    const admin = await userModel.findAll({where:{role:'admin'}});
    if(!admin){
      return res.status(404).json({message:"student not found"});
    }else{
      return res.status(200).json({message:"Successful",admin});
    };

  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"server error"});
  }
};

//update superAdmin

const updateSuperAdmin = async(req,res)=>{
  const {id} = req.params;
  const updateInfo = req.body;
  
  
  try {
    const user = await userModel.findByPk({where:{id}})
  if(!user){
  return res.status(404).json({message:"user not found"});
  } 
  const update = await userModel.update
    (updateInfo,{where:{id}});
  return res.status(201).json({message:"Update Successfull",update});
  
}

  catch (error) {
    console.log(error);
  return res.status(500).json({message:"server error"});
  }
}



export default {getAllStudent,getAllTeacher,getAllAdmin,loginSuperAdmin,updateSuperAdmin,registerSuperAdmin}