import express from 'express';
import  multer from 'multer';
import path from 'path';


const router = express.Router();

// Set up Multer for file upload
const storage = multer.diskStorage({
  destination: './uploads', // Choose your destination folder
  filename: function (req, file, cb) {
    cb(null, 'profile-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
router.use('/uploads', express.static('uploads'));

// Handle POST request for uploading a user profile picture
router.post('/upload', upload.single('profilePicture'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  // Save the file information (e.g., filename) in your database for the user
  const profilePictureFilename = req.file.filename;
  // Example: saveToFileDatabase(req.user.id, profilePictureFilename);

  res.status(200).json({ message: 'Profile picture uploaded successfully.' });
});

module.exports = router;
