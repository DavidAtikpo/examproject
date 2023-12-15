//const jwt = require('jsonwebtoken');
import  jwt  from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Function to generate access token
const jwtSecret = process.env.SECRET_TOKEN;
function generateAccessToken(user) {
  return jwt.sign(user,jwtSecret , { expiresIn: '15m' });
}

export default {
  generateAccessToken,
};
