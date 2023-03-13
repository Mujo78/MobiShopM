const { check } = require("express-validator")
const {
    POST_BRAND_NAME,
    BRAND_ALREADY_EXISTS
} = require("../constants/brand-constants")
const {Brand} = require("../models")

exports.createNewBrand = [
    check("ime")
    .notEmpty()
    .withMessage(POST_BRAND_NAME)
    .custom(async n => {
        const brands = await Brand.findOne({where: {ime: n}});
        if(brands != null){
            return Promise.reject(BRAND_ALREADY_EXISTS(n));
        }
    })
    .bail()
]