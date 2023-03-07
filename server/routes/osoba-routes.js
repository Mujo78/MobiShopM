const express = require("express")
const router = express.Router();
const bcrypt = require("bcrypt")
const {validationResult} = require("express-validator")
const {adminMiddleware} = require("../middlewares/admin-check")

const {Osoba, Korisnik} = require("../models")

const {createOsobaValidator, createAdminValidator} = require("../validators/osoba");
const { loginUser } = require("../validators/korisnik");


router.get("/users", async(req, res) =>{
    const allUsers = await Osoba.findAll();

    res.json(allUsers);
})

router.post("/registration",createOsobaValidator, async(req, res) =>{
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.status(400).json(errors);
        }else{
            const {
                ime, 
                prezime,
                broj_telefona,
                adresa,
                grad,
                username,
                email,
                spol,
                password
            } = req.body;

            let hash = await bcrypt.hash(password, 10);

            const osoba = await Osoba.create({
                ime: ime,
                prezime: prezime,
                broj_telefona: broj_telefona,
                adresa: adresa,
                grad: grad,
                email: email,
                spol: spol
            });

            const korisnik = await Korisnik.create({
                username: username,
                password: hash,
                OsobaId: osoba.id,
                RoleId: 2
            });

            return res.json(`Uspjesna registracija korisnika ${ime}.`);
        }
    }catch(error){
        res.send("Error: " + error.message);
    }
})

router.post("/add-admin",createAdminValidator, async(req, res) =>{
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.json(errors);
        }else{
            const {
                ime, 
                prezime,
                broj_telefona,
                adresa,
                grad,
                email,
                spol,
                password
            } = req.body;

            let username = ime.toLowerCase() + "." + prezime.toLowerCase();
            let hash = await bcrypt.hash(password, 10);

            const user = await Korisnik.findOne({where: {username: username}})
            if(user != null){
               return res.send(`User with username: ${username} already exists!`);
            }else{
                const osoba = await Osoba.create({
                    ime: ime,
                    prezime: prezime,
                    broj_telefona: broj_telefona,
                    adresa: adresa,
                    grad: grad,
                    email: email,
                    spol: spol
                });
                const korisnik = await Korisnik.create({
                    username: username,
                    password: hash,
                    OsobaId: osoba.id,
                    RoleId: 1
                });



                return res.json(`Uspjesna dodavanje novog admina, username: ${ime}.${prezime}`);
            }
        }
    }catch(error){
        res.send("Error: " + error.message);
    }
})

module.exports = router;