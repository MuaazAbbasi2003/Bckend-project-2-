import ApiResponse from "../utils/api-response.js";
import asyncHandler from "../utils/async-Handler.js";
import ApiError from "../utils/api-error.js";
import { User } from "../model/user-model.js";
import { sendemail, generateEmail } from "../utils/mail.js";
const generateTokens = async (userID) => {
  try {
    const user = await User.findById(userID);
    const acessToken = user.createAccessToken();
    const refreshToken = user.generateRefreshToke();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { acessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Somehting went wrong while generating acess token",
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  const doesUserExist = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (doesUserExist) {
    throw new ApiError(409, "user Already Exists in the database");
  }

  const user = await User.create({
    email,
    password,
    username,
    isEmailVerified: false,
  });

  const { unhahedToken, hashedToken, tokenExpiry } = user.generateTmpToken();

  user.emailVerificationExpiry = tokenExpiry;
  user.emailVerificationToken = hashedToken;

  await user.save({ validateBeforeSave: false });
  await sendemail({
    email: user?.email,
    subject: "please verify your email",
    emailContent: generateEmail(
      user.username,
      `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unhahedToken}`,
    ),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
  );
  if (!createdUser) {
    throw new ApiError(500, " something went wong while registering the user ");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { user: createdUser },
        "User Registered Successfully and verification email has been sent on your email",
      ),
    );
});
export { registerUser };
