const express = require("express");
const { validationResult } = require("express-validator");
const { adminMiddleware } = require("../middlewares/admin-check");
const router = express.Router();
const {Brand} = require("../models");
const { createNewBrand } = require("../validators/brands");

router.get("/brands", async(req, res) =>{
    try{

        const allBrands = await Brand.findAll();
        if(allBrands === null){
            return res.status(401).json("Nema brendova na stanju!");
        }else{

            return res.status(200).json(allBrands);
        }
    }catch(err){
        return res.status(401).json(err);
    }
})

router.delete("/delete-brand/:brandName", adminMiddleware,async(req, res) =>{
    try{
        const brandName = req.params.brandName;
        const toDelete = await Brand.findOne({where: {ime:brandName}});

        await toDelete.destroy();
        
        res.status(200).json(`Brand: ${toDelete.ime} uspješno obrisan!`);
    }catch(error){
        res.status(401).json(error);
    }
})

router.post("/add-brand", adminMiddleware, createNewBrand, async(req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(401).json(errors);
        }else{
            const body = req.body;

            const newBrand = await Brand.create(body);
            return res.status(200).json(newBrand);
        }
    }catch(err){
        return res.status(401).json(err)
    }
})

module.exports = router;