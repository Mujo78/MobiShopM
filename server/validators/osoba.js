const { check } = require("express-validator")
const{
    POST_IME_OSOBA,
    POST_PREZIME_OSOBA,
    POST_ADRESA_OSOBA,
    POST_EMAIL_OSOBA,
    POST_BROJTELEFONA_OSOBA,
    POST_SPOL_OSOBA,
    POST_GRAD_OSOBA,
    POST_USERNAME_KORISNIK,
    USER_ALREADY_EXISTS,
    POST_PASSWORD_KORISNIK
} = require("../constants/osoba-constants")
const {Korisnik} = require("../models")

exports.createOsobaValidator = [
    check("ime")
        .notEmpty()
        .withMessage(POST_IME_OSOBA)
        .bail(),
    check("prezime")
        .notEmpty()
        .withMessage(POST_PREZIME_OSOBA)
        .bail(),
    check("adresa")
        .notEmpty()
        .withMessage(POST_ADRESA_OSOBA)
        .bail(),
    check("broj_telefona")
        .notEmpty()
        .withMessage(POST_BROJTELEFONA_OSOBA)
        .bail(),
    check("password")
        .notEmpty()
        .withMessage(POST_PASSWORD_KORISNIK)
        .bail(),
    check("grad")
        .notEmpty()
        .withMessage(POST_GRAD_OSOBA)
        .bail(),
    check("username")
        .notEmpty()
        .withMessage(POST_USERNAME_KORISNIK)
        .custom(async n => {
            const users = await Korisnik.findOne({where: {username: n}});
            if(users != null){
                return Promise.reject(USER_ALREADY_EXISTS(n));
            }
        })
        .bail(),
    check("email")
        .notEmpty()
        .withMessage(POST_EMAIL_OSOBA)
        .bail(),
    check("spol")
        .notEmpty()
        .withMessage(POST_SPOL_OSOBA)
        .bail()
]

exports.createAdminValidator = [
    check("ime")
        .notEmpty()
        .withMessage(POST_IME_OSOBA)
        .bail(),
    check("prezime")
        .notEmpty()
        .withMessage(POST_PREZIME_OSOBA)
        .bail(),
    check("adresa")
        .notEmpty()
        .withMessage(POST_ADRESA_OSOBA)
        .bail(),
    check("broj_telefona")
        .notEmpty()
        .withMessage(POST_BROJTELEFONA_OSOBA)
        .bail(),
    check("grad")
        .notEmpty()
        .withMessage(POST_GRAD_OSOBA)
        .bail(),
    check("spol")
        .notEmpty()
        .withMessage(POST_SPOL_OSOBA)
        .bail()
]

