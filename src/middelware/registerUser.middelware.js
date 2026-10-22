import { User } from "../model/user-model.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import asyncHandler from "../utils/async-Handler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized Acess");
  }
  try {
    const decodedToken = jwt.verify(token, process.env.ATS);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
    );
    if (!user) {
      throw new ApiError(401, "Invalid acess token");
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    throw new ApiError(401, "Invalid access token");
  }
});
