const { check } = require("express-validator");
const {
  POST_FIRSTNAME_PERSON,
  POST_FIRSTNAME_PERSON_LENGTH,
  POST_LASTNAME_PERSON,
  POST_LASTNAME_PERSON_LENGTH,
  POST_ADDRESS_PERSON,
  POST_CITY_PERSON,
  POST_PHONENUMBER_PERSON,
  POST_EMAIL_PERSON,
  POST_GENDER_PERSON,
  POST_USERNAME_USER,
  POST_PASSWORD_USER,
  POST_LETTERINPHONE_PERSON,
  POST_PHONENUMBER_PERSON_LENGTH,
  POST_GENDER_PERSON_CORRECT,
  POST_EMAILVALID_PERSON,
  POST_USERNAME_USER_LENGTH_MIN,
  POST_USERNAME_USER_LENGTH_MAX,
  POST_PASSWORD_LENGTH,
  POST_PASSWORD_WEAK,
} = require("../constants/person-constants");
const { genders, regPattern } = require("./utils");

exports.createPersonValidator = [
  check("first_name")
    .notEmpty()
    .withMessage(POST_FIRSTNAME_PERSON)
    .isLength({ min: 3 })
    .withMessage(POST_FIRSTNAME_PERSON_LENGTH)
    .bail(),
  check("last_name")
    .notEmpty()
    .withMessage(POST_LASTNAME_PERSON)
    .isLength({ min: 3 })
    .withMessage(POST_LASTNAME_PERSON_LENGTH)
    .bail(),
  check("address").notEmpty().withMessage(POST_ADDRESS_PERSON).bail(),
  check("phone_number")
    .notEmpty()
    .withMessage(POST_PHONENUMBER_PERSON)
    .custom((value) => {
      if (value === "") {
        return true;
      }
      return /^[0-9]+$/.test(value);
    })
    .withMessage(POST_LETTERINPHONE_PERSON)
    .isLength(12)
    .withMessage(POST_PHONENUMBER_PERSON_LENGTH)
    .bail(),
  check("password")
    .notEmpty()
    .withMessage(POST_PASSWORD_USER)
    .isLength({ min: 8 })
    .withMessage(POST_PASSWORD_LENGTH)
    .custom((value) => {
      if (value === "") {
        return true;
      }
      return regPattern.test(value);
    })
    .withMessage(POST_PASSWORD_WEAK)
    .bail(),
  check("city").notEmpty().withMessage(POST_CITY_PERSON).bail(),
  check("username")
    .notEmpty()
    .withMessage(POST_USERNAME_USER)
    .isLength({ min: 6 })
    .withMessage(POST_USERNAME_USER_LENGTH_MIN)
    .isLength({ max: 32 })
    .withMessage(POST_USERNAME_USER_LENGTH_MAX)
    .bail(),
  check("email")
    .notEmpty()
    .withMessage(POST_EMAIL_PERSON)
    .isEmail()
    .withMessage(POST_EMAILVALID_PERSON)
    .bail(),
  check("gender")
    .notEmpty()
    .withMessage(POST_GENDER_PERSON)
    .custom((value) => {
      if (genders.includes(value)) {
        return true;
      }
      throw new Error(POST_GENDER_PERSON_CORRECT);
    })
    .bail(),
];

exports.createAdminValidator = [
  check("first_name")
    .notEmpty()
    .withMessage(POST_FIRSTNAME_PERSON)
    .isLength({ min: 3 })
    .withMessage(POST_FIRSTNAME_PERSON_LENGTH)
    .bail(),
  check("last_name")
    .notEmpty()
    .withMessage(POST_LASTNAME_PERSON)
    .isLength({ min: 3 })
    .withMessage(POST_LASTNAME_PERSON_LENGTH)
    .bail(),
  check("address").notEmpty().withMessage(POST_ADDRESS_PERSON).bail(),
  check("phone_number")
    .notEmpty()
    .withMessage(POST_PHONENUMBER_PERSON)
    .custom((value) => {
      if (value === "") {
        return true;
      }
      return /^[0-9]+$/.test(value);
    })
    .withMessage(POST_LETTERINPHONE_PERSON)
    .isLength(12)
    .withMessage(POST_PHONENUMBER_PERSON_LENGTH)
    .bail(),
  check("city").notEmpty().withMessage(POST_CITY_PERSON).bail(),
  check("gender")
    .notEmpty()
    .withMessage(POST_GENDER_PERSON)
    .custom((value) => {
      if (genders.includes(value)) {
        return true;
      }
      throw new Error(POST_GENDER_PERSON_CORRECT);
    })
    .bail(),
];

exports.editProfileValidator = [
  check("first_name")
    .notEmpty()
    .withMessage(POST_FIRSTNAME_PERSON)
    .isLength({ min: 3 })
    .withMessage(POST_FIRSTNAME_PERSON_LENGTH)
    .bail(),
  check("last_name")
    .notEmpty()
    .withMessage(POST_LASTNAME_PERSON)
    .isLength({ min: 3 })
    .withMessage(POST_LASTNAME_PERSON_LENGTH)
    .bail(),
  check("address").notEmpty().withMessage(POST_ADDRESS_PERSON).bail(),
  check("phone_number")
    .notEmpty()
    .withMessage(POST_PHONENUMBER_PERSON)
    .custom((value) => {
      if (value === "") {
        return true;
      }
      return /^[0-9]+$/.test(value);
    })
    .withMessage(POST_LETTERINPHONE_PERSON)
    .isLength(12)
    .withMessage(POST_PHONENUMBER_PERSON_LENGTH)
    .bail(),
  check("city").notEmpty().withMessage(POST_CITY_PERSON).bail(),
  check("gender")
    .notEmpty()
    .withMessage(POST_GENDER_PERSON)
    .custom((value) => {
      if (genders.includes(value)) {
        return true;
      }
      throw new Error(POST_GENDER_PERSON_CORRECT);
    })
    .bail(),
  check("email")
    .notEmpty()
    .withMessage(POST_EMAIL_PERSON)
    .isEmail()
    .withMessage(POST_EMAILVALID_PERSON)
    .bail(),
];
