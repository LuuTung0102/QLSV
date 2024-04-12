import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Xin hãy nhập tên của bạn!"],
    minLength: [3, "Tên phải chứa ít nhất 3 ký tự!"],
    maxLength: [30, "Tên không thể vượt quá 30 ký tự!"],
  },
  email: {
    type: String,
    required: [true, "Vui lòng nhập email của bạn!"],
    validate: [validator.isEmail, "Vui lòng cung cấp một email hợp lệ!"],
  },
  phone: {
    type: Number,
    required: [true, "Xin vui lòng điền số điện thoại của bạn!"],
  },
  password: {
    type: String,
    required: [true, "Vui lòng cung cấp Mật khẩu!"],
    minLength: [8, "Mật khẩu phải chứa ít nhất 8 ký tự!"],
    maxLength: [32, "Mật khẩu không thể vượt quá 32 ký tự!"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "Vui lòng chọn một vai trò"],
    enum: ["Admin", "Student"],
  },
  avatar: {
    public_id: {
      type: String, 
      required: true,
    },
    url: {
      type: String, 
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

userSchema.methods.getRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);
