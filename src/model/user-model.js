import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: `https://placehold.co/200x200`,
        localPath: "",
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.createAccessToken = function () {
  const accessToken = jwt.sign(
    {
      _id: this._id,
      udername: this.username,
      email: this.email,
    },
    process.env.ATS,
    {
      expiresIn: process.en.ATSE,
    },
  );
  return accessToken;
};
userSchema.methods.generateRefreshToke = function () {
  const refreshToken = jwt.sign(
    {
      _id: this._id,
    },
    process.env.RTS,
    {
      expiresIn: process.env.RTSE,
    },
  );
  return refreshToken;
};

userSchema.methods.generateTmpToken = function () {
  const unhahedToken = crypto.randomBytes(20).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(unhahedToken)
    .digest("hex");
  const tokenExpiry = Date.now + 20 * 60 * 1000;

  return { unhahedToken, hashedToken, tokenExpiry };
};

export const User = mongoose.model("User", userSchema);
