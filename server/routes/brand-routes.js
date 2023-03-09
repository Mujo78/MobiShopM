const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const {Brand} = require("../models")

router.get("/brands", async(req, res) =>{
    const allBrands = await Brand.findAll();

    return res.status(200).json(allBrands);
})


module.exports = router;