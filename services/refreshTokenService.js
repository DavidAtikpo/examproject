// refreshTokenService.js

import userModel from '../models/userModel.js';

const createRefreshToken = async (refreshTokenValue) => {
  try {
    const newRefreshToken = await userModel.create({
      refreshToken: refreshTokenValue,
    });
    return newRefreshToken;
  } catch (error) {
    console.error('Error creating refresh token:', error);
    throw error;
  }
};

export default {
  createRefreshToken,
};
