const { check } = require("express-validator")
const {
    POST_PASSWORD_KORISNIK,
    POST_UERNAME_KORISNIK,
    USER_ALREADY_EXISTS,
    USER_DOESNT_EXISTS
}  = require("../constants/korisnik-constants")
const {Korisnik} = require("../models")
const bcrypt = require("bcrypt")
const { POST_USERNAME_KORISNIK } = require("../constants/osoba-constants")





exports.loginUser = [
    check("username")
        .notEmpty()
        .withMessage(POST_UERNAME_KORISNIK)
        .bail(),
    check("password")
        .notEmpty()
        .withMessage(POST_PASSWORD_KORISNIK)
        .bail()
]