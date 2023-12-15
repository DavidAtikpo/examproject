import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.SECRET_TOKEN;
const jwtSecretRefreshToken = process.env.REFRESH_TOKEN;

const handleRefreshToken = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.status(409).json({ message: "not found" });
    }
    const refreshToken = cookies.jwt;
    const tokenDuration = process.env.TOKEN_DURATION;

    const findStudent = await userModel.findOne({ where: { user_id: user_id.refreshToken == refreshToken } });

    if (!findStudent) {
      return res.status(401).json({ message: "Invalid credentials: email not found" });
    }

    // Decode and verify the refresh token
    const decodedToken = jwt.verify(refreshToken, jwtSecretRefreshToken);

    if (!decodedToken || !decodedToken.user_id) {
      return res.status(401).json({ error: 'Invalid refresh token payload' });
    }

    const tokenVariables = {
      user_id: findStudent.user_id,
      email: findStudent.email,
      firstName: findStudent.firstName,
      lastName: findStudent.lastName,
    };

    const accessToken = jwt.sign({ tokenVariables: decodedToken.tokenVariables }, jwtSecret, { expiresIn: tokenDuration });
    return res.status(200).json({ message: "accessToken", accessToken });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ warning: "Internal error" });
  }
};

export default { handleRefreshToken };
