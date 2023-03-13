const express = require("express")
const {validationResult, check} = require("express-validator")
const router = express.Router()
const {createMobitelValidator} = require("../validators/mobitel")
const {Mobitel, Brand} = require("../models")
const { adminMiddleware } = require("../middlewares/admin-check")
const { authMiddleware } = require("../middlewares/auth-middleware")
const brand = require("../models/brand")


router.get("/mobiteli", async(req, res) => {
    try{
        const allOfThem = await Mobitel.findAll();
        if(allOfThem === null){
            return res.status(401).json("Nema mobitela na stanju.");
        }else{
            return res.status(200).json(allOfThem);        
        }
    }catch(error){
        return res.status(401).json(error);
    }
})

router.get("/mobiteli/:brandName", async(req, res) => {
    try{
        const brandName = req.params.brandName;
        if(!brandName){
            const allOfThem = await Mobitel.findAll();
            return res.json(allOfThem);
        }else{
            const brand = await Brand.findOne({where: {ime: brandName}});
            if(brand !== null){
                const mobileBrand = await Mobitel.findAll({where: {BrandId: brand.id}});
                return res.json(mobileBrand);
            }
        }
    }catch(error) {
        return res.json(error);
    }
})
router.get("/mobile/:id", async(req, res) => {
    try{
        const id = req.params.id;
        if(!id){
            return res.json();
        }else{
            const brand = await Brand.findOne({where: {id: id}});
            if(brand !== null){
                const mobileBrand = await Mobitel.findAll({where: {BrandId: brand.id}});
                if(!mobileBrand){
                    return res.status(401).json("Nema rezultata pretrage!");
                }else{
                    return res.json(mobileBrand);
                }
             }
        }
    }catch(error) {
        return res.json(error);
    }
})

router.post("/post-mobitel", adminMiddleware ,createMobitelValidator, async(req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
           return res.status(401).json(errors)
        }else{
            const body = req.body;
            const newMobile = await Mobitel.create(body);

            res.status(200).json(newMobile);
        }
    }catch(error){
       return res.status(401).json(error);
    }
})


router.post("/edit-mobitel/:id", adminMiddleware ,async(req, res) =>{
    try{
        const id = req.params.id;
        const toUpdate = await Mobitel.findByPk(id);

        if(!toUpdate){
            res.send("Nema takvog mobitela u sistemu!");
        }else{
            const {
                    naziv,
                    ram,
                    memory,
                    procesor,
                    velicinaEkrana,
                    baterija,
                    photo,
                    kamera,
                    cijena
                } = req.body;
                
                if(naziv != null) toUpdate.naziv = naziv;
                if(ram != null) toUpdate.ram = ram;
                if(memory != null) toUpdate.memory = memory;
                if(procesor != null) toUpdate.procesor = procesor;
                if(velicinaEkrana != null) toUpdate.velicinaEkrana = velicinaEkrana;
                if(baterija != null) toUpdate.baterija = baterija;
                if(kamera != null) toUpdate.kamera = kamera;
                if(photo != null) toUpdate.photo = photo;
                if(cijena != null) toUpdate.cijena = cijena;

                const newUpdated = await toUpdate.save();

                res.send(newUpdated);
            }
    }catch(error){
        res.json(error.message)
    }
})

router.delete("/delete-mob/:mobileName", adminMiddleware ,async(req, res) => {
    try{
        const mobileName = req.params.mobileName;
        const toDelete = await Mobitel.findOne({where: {naziv:mobileName}});

        await toDelete.destroy();
        
        res.status(200).json(`Mobitel: ${toDelete.naziv} uspješno obrisan!`);
    }catch(error){
        res.status(401).json(error);
    }
})

module.exports = router;