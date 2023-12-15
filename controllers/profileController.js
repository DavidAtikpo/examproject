// Import userModel using CommonJS syntax
import userModel from "../models/userModel.js";

const uploadProfilePicture = async function (req, profilePicture) {
  try {
    const user_id = req.user_id;

    // Find the profile by ID
    const profile = await userModel.findById(user_id);

    if (!profile) {
      throw new Error('Profile not found');
    }

    // Update profile picture if provided
    if (profilePicture) {
      profile.profilePicture = {
        data: profilePicture.buffer,
        contentType: profilePicture.mimetype,
      };
    } else {
      throw new Error('No profile picture provided');
    }

    // Save the updated profile
    await profile.save();

    return { message: 'Profile picture updated successfully' };
  } catch (error) {
    console.error(error);
    throw new Error('Internal server error');
  }
};

export default {
  uploadProfilePicture,
};
