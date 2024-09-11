const POST_USERNAME_USER = "Username is required!";
const POST_USERNAME_USER_LENGTH_MIN =
  "Username must be at least 6 characters long.";
const POST_USERNAME_USER_LENGTH_MAX = "Username cannot exceed 32 characters.";

const POST_PASSWORD_USER = "Password is required!";
const USER_OLD_PASSWORD = "Old password is required!";
const USER_NEW_PASSWORD = "New password is required!";
const POST_NEW_PASSWORD_LENGTH = "Password must be at least 8 characters long.";
const POST_NEW_PASSWORD_WEAK =
  "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
const USER_CONFIRM_PASSWORD = "Confirm password is required!";

module.exports = {
  POST_USERNAME_USER,
  POST_USERNAME_USER_LENGTH_MIN,
  POST_USERNAME_USER_LENGTH_MAX,
  POST_PASSWORD_USER,
  USER_OLD_PASSWORD,
  USER_NEW_PASSWORD,
  USER_CONFIRM_PASSWORD,
  POST_NEW_PASSWORD_LENGTH,
  POST_NEW_PASSWORD_WEAK,
};
