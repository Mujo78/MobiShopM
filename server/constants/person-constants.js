const POST_FIRSTNAME_PERSON = "First name is required!";
const POST_LASTNAME_PERSON = "Last name is required!";
const POST_PHONENUMBER_PERSON = "Phone number is required!";
const POST_ADDRESS_PERSON = "Address is required!";
const POST_CITY_PERSON = "City is required!";
const POST_EMAIL_PERSON = "Eemail is required!";
const POST_GENDER_PERSON = "Gender is required!";
const POST_PASSWORD_USER = "Password is required!";
const POST_USERNAME_USER = "Username is required!";
const POST_LETTERINPHONE_PERSON = "Phone number must contain only digits!";
const USER_ALREADY_EXISTS = (value) =>
  `User with username ${value} already exists`;

module.exports = {
  POST_FIRSTNAME_PERSON,
  POST_LASTNAME_PERSON,
  POST_ADDRESS_PERSON,
  POST_CITY_PERSON,
  POST_PHONENUMBER_PERSON,
  POST_EMAIL_PERSON,
  POST_GENDER_PERSON,
  POST_USERNAME_USER,
  USER_ALREADY_EXISTS,
  POST_PASSWORD_USER,
  POST_LETTERINPHONE_PERSON,
};
