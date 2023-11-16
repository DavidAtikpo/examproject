import studentModel from "../models/studentModel.js"

const registerStudent = async (req,res)=>{
    try{
        const result = await studentService.newStudentService(req.body, req.file)
        if(result.success){
            return res.status(200).json({"message":"Success"})
        }
        else if(result.messageCount==2){
            return res.status(result.statusCode).json({message:result.message,message1:result.message1})

        }
        else{
            return res.status(result.statusCode).json({message: result.message})
        }
    }catch(error){
        console.log(error)
        return res.status(500).json({"message":"Server Error"})
    }
}