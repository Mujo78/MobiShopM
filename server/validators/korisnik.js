const { check } = require("express-validator")
const {
    POST_PASSWORD_KORISNIK, 
}  = require("../constants/korisnik-constants")


exports.loginUser = [
    check("password")
        .notEmpty()
        .withMessage(POST_PASSWORD_KORISNIK)
        .bail()
]