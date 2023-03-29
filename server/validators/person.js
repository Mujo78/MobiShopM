const { check } = require("express-validator")
const{
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
    POST_LETTERINPHONE_PERSON
} = require("../constants/person-constants")
const {User} = require("../models")

exports.createPersonValidator = [
    check("first_name")
        .notEmpty()
        .withMessage(POST_FIRSTNAME_PERSON)
        .bail(),
    check("last_name")
        .notEmpty()
        .withMessage(POST_LASTNAME_PERSON)
        .bail(),
    check("address")
        .notEmpty()
        .withMessage(POST_ADDRESS_PERSON)
        .bail(),
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
          .bail(),
    check("password")
        .notEmpty()
        .withMessage(POST_PASSWORD_USER)
        .bail(),
    check("city")
        .notEmpty()
        .withMessage(POST_CITY_PERSON)
        .bail(),
    check("username")
        .notEmpty()
        .withMessage(POST_USERNAME_USER)
        .custom(async n => {
            const users = await User.findOne({where: {username: n}});
            if(users != null){
                return Promise.reject(USER_ALREADY_EXISTS(n));
            }
        })
        .bail(),
    check("email")
        .notEmpty()
        .withMessage(POST_EMAIL_PERSON)
        .bail(),
    check("gender")
        .notEmpty()
        .withMessage(POST_GENDER_PERSON)
        .bail()
]

exports.createAdminValidator = [
    check("first_name")
        .notEmpty()
        .withMessage(POST_FIRSTNAME_PERSON)
        .bail(),
    check("last_name")
        .notEmpty()
        .withMessage(POST_LASTNAME_PERSON)
        .bail(),
    check("address")
        .notEmpty()
        .withMessage(POST_ADDRESS_PERSON)
        .bail(),
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
          .bail(),
    check("city")
        .notEmpty()
        .withMessage(POST_CITY_PERSON)
        .bail(),
    check("gender")
        .notEmpty()
        .withMessage(POST_GENDER_PERSON)
        .bail()
]

