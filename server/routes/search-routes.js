const express = require("express")
const router = express.Router()
const {Op} = require("sequelize");
const {Mobitel} = require("../models");



router.post("/search", async(req, res) => {
    try{
        const criteriaSearch = {};
        const {
            naziv,
            ram,
            internal,
            velicinaEkrana,
            baterija,
            cijena,
            BrandId,
            os,
        } = req.body;

        // Name search
        if(naziv !== ""){
            criteriaSearch.naziv ={
                [Op.like] : `%${naziv}%`
            }
        }
        // RAM search
        const trueRAM = [];
        Object.keys(ram).forEach(r => {
            if(ram[r]){
                trueRAM.push(parseInt(r.substring(3,r.length)));
            }
        });

        if(trueRAM.length > 0){
            criteriaSearch.ram ={
                [Op.in] : trueRAM
            }
        }
        // Memory search
        const trueInternal =[];
        Object.keys(internal).forEach(i => {
            if(internal[i]){
                trueInternal.push(parseInt(i.substring(8,i.length)));
            }
        });

        if(trueInternal.length > 0){
            criteriaSearch.internal ={
                [Op.in] : trueInternal
            }
        }
        // Screen size
        if(velicinaEkrana !== ""){
            criteriaSearch.velicinaEkrana = velicinaEkrana
        }
        // Battery
        if(baterija !== ""){

            criteriaSearch.baterija ={
                [Op.between]: [baterija-500, baterija+500]
            }
        }
        // OS -- doesnt working still
        if(os !== ""){
             if(os === "Other"){
                criteriaSearch.os = {
                    [Op.and]:[
                            {[Op.notLike]: `Android%`},
                            {[Op.notLike]: `iOS%`}
                    ]
                }
            }else if(os === "Android") {
                criteriaSearch.os = {
                        [Op.like]:`Android%`
                    } 
            }else{
                criteriaSearch.os = {
                    [Op.like]:`iOS%`
                } 
            }
        }
       // Price
       const prices = [];
        Object.values(cijena).forEach(c => {
            if(c >= 0){
                prices.push(c);
            }
        });

        if(prices[0] !== "" && prices[1]!== "" && prices[1] !== 0 && prices[1] !== undefined){
            criteriaSearch.cijena = {
                [Op.between]: [prices[0], prices[1]]
            }
        }
        //Brands
        if(BrandId !== "All"){
            criteriaSearch.BrandId = BrandId
        }
        
        const allPhones = await Mobitel.findAll({where: criteriaSearch})
        if(allPhones.length === 0){
            return res.status(401).json("Nema rezultata pretrage.");
        }else{
            
            return res.status(200).json(allPhones);
        }

    }catch(error){
        console.log(error);
    }
})

module.exports = router;