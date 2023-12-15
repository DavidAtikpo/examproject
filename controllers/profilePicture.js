import multer from "multer"

const stortage = multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null, './Images')
  },
  filename:(req, file, cb) =>{
     cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ 
  storage:stortage,
  limits:{fileSize:'1000000'},
  fileFilter:(req, file, cb, ) => {
      const fileType =/jpeg|jpg|png|gif|/
      
      const mimeType = fileType.test(file.mimetype)
      const extname = fileType.test(path.extname(file.originalname))
      if (mimeType && extname){
          return cb(null, true)
      }
      cb("Give proper files fromate to upload")
      console.log("Give proper files");
  }

}).single('Images')

export default {upload}