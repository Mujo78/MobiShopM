const express = require("express")
const {validationResult, check} = require("express-validator")
const router = express.Router()
const {createMobitelValidator} = require("../validators/mobile")
const {Mobile, Brand} = require("../models")
const { adminMiddleware } = require("../middlewares/admin-check")
const { authMiddleware } = require("../middlewares/auth-middleware")
const brand = require("../models/brand")


router.get("/mobiles", async(req, res) => {
    try{
        const allOfThem = await Mobile.findAll();
        if(allOfThem === null){
            return res.status(401).json("Not available!");
        }else{
            return res.status(200).json(allOfThem);        
        }
    }catch(error){
        return res.status(401).json(error);
    }
})


router.get("/mobiles-top-prices", async(req, res) => {
    try{
        const allOfThem = await Mobile.findAll();
        if(allOfThem === null){
            return res.status(401).json("Not available.");
        }else{
            let topPrices = allOfThem.filter(m => m.price >= 1000).slice(0,5);
            return res.status(200).json(topPrices);        
        }
    }catch(error){
        return res.status(401).json(error);
    }
})

router.get("/mobile-phone/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const allOfThem = await Mobile.findOne({where: {id: id}});
        if(allOfThem === null){
            return res.status(401).json("Error404");
        }else{
            return res.status(200).json(allOfThem);        
        }
    }catch(error){
        return res.status(401).json(error);
    }
})

router.get("/mobiles/:brandName", async(req, res) => {
    try{
        const brandName = req.params.brandName;
        if(!brandName){
            const allOfThem = await Mobile.findAll();
            return res.json(allOfThem);
        }else{
            const brand = await Brand.findOne({where: {name: brandName}});
            if(brand !== null){
                const mobileBrand = await Mobile.findAll({where: {BrandId: brand.id}});
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
                const mobileBrand = await Mobile.findAll({where: {BrandId: brand.id}});
                if(!mobileBrand){
                    return res.status(401).json("Not available");
                }else{
                    return res.json(mobileBrand);
                }
             }
        }
    }catch(error) {
        return res.json(error);
    }
})

router.post("/post-mobile", adminMiddleware ,createMobitelValidator, async(req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
           return res.status(401).json(errors)
        }else{
            const body = req.body;
            const newMobile = await Mobile.create(body);

            res.status(200).json(newMobile);
        }
    }catch(error){
       return res.status(401).json(error);
    }
})


router.put("/edit-mobile/:id", adminMiddleware, createMobitelValidator ,async(req, res) =>{
    try{
        const err = validationResult(req);
        if(!err.isEmpty()){
            console.log(err);
            return res.status(401).json(err);
        }else{
            const id = req.params.id;
            const toUpdate = await Mobile.findOne({where: {id: id}});

            if(!toUpdate){
                res.status(401).json("No such mobile in store!");
            }else{
                const {
                        mobile_name,
                        ram,
                        internal,
                        processor,
                        screen_size,
                        battery,
                        photo,
                        os,
                        camera,
                        price,
                        quantity,
                        BrandId
                    } = req.body;


                    if(mobile_name != null) toUpdate.mobile_name = mobile_name;
                    if(ram != null) toUpdate.ram = ram;
                    if(internal != null) toUpdate.internal = internal;
                    if(processor != null) toUpdate.processor = processor;
                    if(screen_size != null) toUpdate.screen_size = screen_size;
                    if(battery != null) toUpdate.battery = battery;
                    if(camera != null) toUpdate.camera = camera;
                    if(photo != null) toUpdate.photo = photo;
                    if(os != null) toUpdate.os = os;
                    if(price != null) toUpdate.price = price;
                    if(quantity != null) toUpdate.quantity = quantity;
                    if(BrandId != null) toUpdate.BrandId = BrandId;

                    const newUpdated = await toUpdate.save();

                    res.status(200).json(newUpdated);
                }
            }
    }catch(error){
        console.log(error);
        res.status(401).json(error)
    }
})

router.delete("/delete-mob/:mobileName", adminMiddleware ,async(req, res) => {
    try{
        const mobileName = req.params.mobileName;
        const toDelete = await Mobile.findOne({where: {mobile_name:mobileName}});

        await toDelete.destroy();
        
        res.status(200).json(`Mobile: ${toDelete.mobile_name} successfully deleted!`);
    }catch(error){
        res.status(401).json(error);
    }
})

module.exports = router;