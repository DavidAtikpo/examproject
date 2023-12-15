import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.SECRET_TOKEN;

const adminInfo = async (req, res, next) => {
   
    try {
        
    
        const tokenDuration = process.env.TOKEN_DURATION;

        const {email, password } = req.body;

        //const student = studentInfo.email
        const findAdmin = await userModel.findOne({ where: {email:email} });

        if (!findAdmin) {
            return res.status(401).json({ message: "invalid credentials email" });
        }
    
        const passwordMatch = await bcrypt.compare(password, findAdmin.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: " incorrect password" });
        }
         const tokenVariables = {
            id: findAdmin.id, 
            email:email,
             firstName: findAdmin.firstName }

        const adminToken = jwt.sign(tokenVariables, jwtSecret, { expiresIn: tokenDuration });
        req.token = adminToken;
        req.admin= findAdmin;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Unable to login" })
    }
};

// verify token
const tokenVerification =async(req,res,next)=>{
    try {
        const token= req.headers.token;
        console.log(token);
        if (!token){
            return res.status(404).json({message:"no token provided"});
        }
        const verifying= jwt.verify(token, jwtSecret,);
        req.studentId=verifying.id;
        console.log(verifying.id);
            // if (decodedToekn){
            //  req.usedId=decodedToekn.id
            // }

            next();
    } catch (error) {
        return res.status(401).json({message:"error token verification"})
    }
} 


export default { adminInfo,tokenVerification}



