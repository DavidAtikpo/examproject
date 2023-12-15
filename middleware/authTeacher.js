import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.SECRET_TOKEN;

const teacherInfo = async (req, res, next) => {
   
    try {
        
    
        const tokenDuration = process.env.TOKEN_DURATION;

        const {email, password } = req.body;

        //const student = studentInfo.email
        const findTeacher = await userModel.findOne({ where: {email:email} });
        if (!findTeacher) {
            return res.status(401).json({ message: "invalid credentials email" });
        }
    
        const passwordMatch = await bcrypt.compare(password, findTeacher.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "invalid password!!" });
        }
        // const verify = await userModel.findOne({where:{email:email,role:"teacher"}})
        // if(!verify){
        //     return res.status(401).json({message:"you are not a student"})
        // }
         const tokenVariables = {
            user_id: findTeacher.user_id, 
            email:findTeacher.email,
             firstName: findTeacher.firstName,
            lastName: findTeacher.lastName}
            
        const teacherToken = jwt.sign(tokenVariables, jwtSecret, { expiresIn: tokenDuration });
        req.token = teacherToken;
        req.teacher= findTeacher;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Your are not autorized" })
    }
};

// verify token
const tokenVerification =async(req,res,next)=>{
    try {
        const token= req.headers.token;
        if (!token){
            return res.status(404).json({message:"no token provided"});
        }
        const decodedToken= jwt.verify(token, jwtSecret,);
             if (decodedToken){
              req.userId=decodedToken.user_id;
            }

            next();
    } catch (error) {
        return res.status(401).json({message:"error token verification"})
    }
} 


export default { teacherInfo,tokenVerification}
