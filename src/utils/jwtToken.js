export const sendToken = (user, statusCode, res, message) => {
  const accessToken = user.getJWTToken();
  const refreshToken = user.getRefreshToken(); 
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

 
  res
    .status(statusCode)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken)
    .json({
      success: true,
      user,
      message,
      accessToken,
      refreshToken,
    });
};
