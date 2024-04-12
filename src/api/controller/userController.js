import { catchAsyncErrors } from "../../middlewares/catchAsyncError.js";
import { sendToken } from "../../utils/jwtToken.js";
import * as userService from "../service/userService.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.avatar) {
    return next(new ErrorHandler("Resume File Required!", 400));
  }

  const { name, email, phone, role, password } = req.body;
  const avatar = req.files.avatar;

  try {
    const user = await userService.registerUser({ name, email, phone, role, password, avatar });
    sendToken(user, 201, res, "User Registered!");
  } catch (error) {
    return next(error);
  }
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await userService.loginUser(email, password);
    sendToken(user, 201, res, "User Logged In!");
  } catch (error) {
    return next(error);
  }
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.id;

  try {
    await userService.deleteUserById(userId);
    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    return next(error);
  }
});
