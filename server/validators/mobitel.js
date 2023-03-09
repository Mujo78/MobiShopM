const { check } = require("express-validator")
const {
    POST_BATERIJA_MOBITEL,
    POST_CIJENA_MOBITEL,
    POST_VELICINAEKRANA_MOBITEL,
    POST_RAM_MOBITEL,
    POST_PROCESOR_MOBITEL,
    POST_KAMERA_MOBITEL,
    POST_NAZIV_MOBITEL,
    POST_PHOTO_MOBITEL,
    POST_OS_MOBITEL,
    POST_MEMORY_MOBITEL
} = require("../constants/mobitel-constants")

exports.createMobitelValidator = [
    check("naziv")
        .notEmpty()
        .withMessage(POST_NAZIV_MOBITEL)
        .bail(),
    check("ram")
        .notEmpty()
        .withMessage(POST_RAM_MOBITEL)
        .bail(),
    check("internal")
        .notEmpty()
        .withMessage(POST_MEMORY_MOBITEL)
        .bail(),
    check("procesor")
        .notEmpty()
        .withMessage(POST_PROCESOR_MOBITEL)
        .bail(),
    check("velicinaEkrana")
        .notEmpty()
        .withMessage(POST_VELICINAEKRANA_MOBITEL)
        .bail(),
    check("baterija")
        .notEmpty()
        .withMessage(POST_BATERIJA_MOBITEL)
        .bail(),
    check("photo")
        .notEmpty()
        .withMessage(POST_PHOTO_MOBITEL)
        .bail(),
    check("os")
        .notEmpty()
        .withMessage(POST_OS_MOBITEL)
        .bail(),
    check("kamera")
        .notEmpty()
        .withMessage(POST_KAMERA_MOBITEL)
        .bail(),
    check("cijena")
        .notEmpty()
        .withMessage(POST_CIJENA_MOBITEL)
        .bail()
    
]