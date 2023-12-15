// authUser.js

import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.SECRET_TOKEN;
const jwtSecretRefreshToken = process.env.REFRESH_TOKEN;

const studentInfo = async (req, res, next) => {
  try {
    const tokenDuration = process.env.TOKEN_DURATION;
    const refreshTokenDuration = process.env.REFRESH_DURATION;
    const { email, password } = req.body;

    const findStudent = await userModel.findOne({ where: { email: email, role: "student" } });

    if (!findStudent) {
      return res.status(401).json({ message: "Invalid credentials: email not found" });
    }

    const passwordMatch = await bcrypt.compare(password, findStudent.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials: incorrect password" });
    }

    const tokenVariables = {
      user_id: findStudent.user_id,
      email: findStudent.email,
      firstName: findStudent.firstName,
      lastName: findStudent.lastName,
    };

    const studentToken = jwt.sign(tokenVariables, jwtSecret, { expiresIn: tokenDuration });
    req.token = studentToken;
    req.student = findStudent;

    const refreshToken = jwt.sign(tokenVariables, jwtSecretRefreshToken, { expiresIn: refreshTokenDuration });
    req.refreshToken = refreshToken;
    req.student = findStudent;

    // Remove the existing refresh token from the database
    await userModel.update({ refreshToken: null }, { where: { user_id: findStudent.user_id } });

    // Save the new refresh token to the database
    await userModel.update({ refreshToken: refreshToken }, { where: { user_id: findStudent.user_id } });

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ warning: "Unable to login" });
  }
};

const tokenVerification = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(404).json({ message: "No token provided in the header" });
    }
    const decodedToken = jwt.verify(token, jwtSecret);
    if (decodedToken) {
      req.userId = decodedToken.user_id;
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Error during token verification" });
  }
};

export default { studentInfo, tokenVerification };
