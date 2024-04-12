import { User } from "../../models/userSchema.js";
import { ErrorHandler } from "../../middlewares/error.js";
import cloudinary from "cloudinary";

export const registerUser = async (userData) => {
  const { name, email, phone, role, password, avatar } = userData;

  const cloudinaryResponse = await cloudinary.uploader.upload(avatar.tempFilePath);

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    throw new ErrorHandler("Failed to upload Resume to Cloudinary", 500);
  }

  const isEmail = await User.findOne({ email });
  if (isEmail) {
    throw new ErrorHandler("Email already registered!");
  }

  const user = await User.create({
    name,
    email,
    phone,
    role,
    password,
    avatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  return user;
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password +role");
  if (!user) {
    throw new ErrorHandler("Invalid Email Or Password.", 400);
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    throw new ErrorHandler("Invalid Email Or Password.", 400);
  }
  return user;
};


export const deleteUserById = async (userId) => {
  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) {
    throw new ErrorHandler("User not found.", 404);
  }
};

