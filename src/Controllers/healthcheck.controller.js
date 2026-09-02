import ApiResponse from "../utils/api-response.js";
import asyncHandler from "../utils/async-Handler.js";

const healthcheck = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, { message: " success in running the server" }));
});
export default healthcheck;
