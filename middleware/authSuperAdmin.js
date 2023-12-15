import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.SECRET_TOKEN;

const superAdminInfo = async (req, res, next) => {
   
    try {
        
    
        const tokenDuration = process.env.TOKEN_DURATION;

        const {firstName } = req.body;

        //const student = studentInfo.email

        const superAdmin = await userModel.findOne({ where: {firstName, role:'superAdmin' }});

        if (!superAdmin) {
            return res.status(401).json({ message: "invalid credentials firstName" });
        }
    
        // const firstNameMatch = await bcrypt.compare(firstName, findSuperAdmin.firstName);

        // if (!firstNameMatch) {
        //     return res.status(401).json({ message: " incorrect password" });
        // }
        
        //  const tokenVariables = {
        //     //id: findSuperAdmin.id, 
        //      firstName: findSuperAdmin.firstName }

        const token = jwt.sign({userId:superAdmin.role}, jwtSecret, { expiresIn: tokenDuration });
        req.user = superAdmin;
        req.token= token;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Unable to login" })
    }
};

// verify token
// const tokenVerification =async(req,res,next)=>{
//     try {
//         const token= req.headers.token;
//         console.log(token);
//         if (!token){
//             return res.status(404).json({message:"no token provided"});
//         }
//         const verifying= jwt.verify(token, jwtSecret,);
//         req.superAdminId=verifying.id;
//         console.log(verifying.id);
//             // if (decodedToekn){
//             //  req.usedId=decodedToekn.id
//             // }

//             next();
//     } catch (error) {
//         return res.status(401).json({message:"error token verification"})
//     }
// } 


export default { superAdminInfo,}
