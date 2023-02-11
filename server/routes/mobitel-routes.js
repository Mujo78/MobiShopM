const express = require("express")
const {validationResult} = require("express-validator")
const router = express.Router()
const {createMobitelValidator} = require("../validators/mobitel")
const {Mobitel} = require("../models")

router.get("/mobiteli", async(req, res) => {
    const allOfThem = await Mobitel.findAll();

    res.json(allOfThem);
})

router.get("/mobiteli/:id", async(req, res) => {
    const id = req.params.id;
    const allOfThemWithId = await Mobitel.findByPk(id);

    if(allOfThemWithId == null){
        res.json("Ne postoji takav mobitel u sistemu!");
    }else{
        res.json(allOfThemWithId);
    }
})

router.post("/post-mobitel",createMobitelValidator, async(req, res) => {
    try{
        const errors = validationResult(req);

        if(errors.isEmpty()){
            const body = req.body;
            const newMobile = await Mobitel.create(body);

            res.json(newMobile);
        }else{
            res.json(errors)
        }
    }catch(error){
        res.json("Error: " + error);
    }
})


router.post("/edit-mobitel/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const toUpdate = await Mobitel.findByPk(id);

        if(!toUpdate){
            res.send("Nema takvog mobitela u sistemu!");
        }else{
            const {
                    naziv,
                    ram,
                    procesor,
                    velicinaEkrana,
                    baterija,
                    kamera,
                    cijena
                } = req.body;
                
                if(naziv != null) toUpdate.naziv = naziv;
                if(ram != null) toUpdate.ram = ram;
                if(procesor != null) toUpdate.procesor = procesor;
                if(velicinaEkrana != null) toUpdate.velicinaEkrana = velicinaEkrana;
                if(baterija != null) toUpdate.baterija = baterija;
                if(kamera != null) toUpdate.kamera = kamera;
                if(cijena != null) toUpdate.cijena = cijena;

                const newUpdated = await toUpdate.save();

                res.send(newUpdated);
            }
    }catch(error){
        res.json(error.message)
    }
})

router.delete("/:id", async(req, res) => {
    const id = req.params.id;
    const toDelete = await Mobitel.findByPk(id);
    if(!toDelete){
        res.send("Vozilo ne postoji!");
    }else{
        const deleted = await Mobitel.destroy({
            where: {id: id}
        });

        res.send(`Mobitel: ${toDelete.naziv} uspješno obrisan!`);
    }
})

module.exports = router;