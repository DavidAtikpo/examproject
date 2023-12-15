// const generateToken = (user)=>{
//   try {
//     const payload= {id:user_id, email:user.email};
//     const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY,{expiresIn:"14m"})

//     const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY,{expiresIn:"30D"})

//     const usertoken = await userModel.findOne({userId:user_id});
//     if(usertoken)await userModel.remove();

//     await new userModel({userId:user_id,refreshToken:refreshToken}).save();

//     return Promise.resolve({accessToken,refreshToken});

//   } catch (error) {
//     console.log(error);
//   }
// }

// export default {generateToken}