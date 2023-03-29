const express = require("express")
const router = express.Router();
const bcrypt = require("bcrypt")
const {validationResult} = require("express-validator")
const {adminMiddleware} = require("../middlewares/admin-check")
const {Persons, User, Cart} = require("../models")
const {createPersonValidator, createAdminValidator} = require("../validators/person");

router.get("/users", async(req, res) =>{
    const allUsers = await Persons.findAll();
    res.json(allUsers);
})

router.get("/person/:id", async(req, res) => {
    try{
        const id = req.params.id;

        if(id !== 0){
            
            const UserById = await User.findOne({where: {id: id}});
            const PersonById = await Persons.findOne({where: {id: UserById.PersonId}});
    
            return res.status(201).json(PersonById);
        }
    }catch(error){
        return res.status(401).json(error);
    }
})

router.post("/registration",createPersonValidator, async(req, res) =>{
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.status(400).json(errors);
        }else{
            const {
                first_name,
                last_name,
                phone_number,
                address,
                city,
                email,
                gender,
                username,
                password
            } = req.body;

            let hash = await bcrypt.hash(password, 10);

            const person = await Persons.create({
                first_name:first_name,
                last_name:last_name,
                phone_number: phone_number,
                address:address,
                city:city,
                email:email,
                gender:gender
            });

            const user = await User.create({
                username: username,
                password: hash,
                PersonId: person.id,
                RoleId: 2
            });
            console.log(user);
            const cart = await Cart.create({
                UserId: user.id
            });

            return res.json(`Registration successful: ${first_name}.`);
        }
    }catch(error){
        res.send("Error: " + error.message);
    }
})

router.post("/add-admin",createAdminValidator, async(req, res) =>{
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(401).json(errors);
        }else{
            const {
                first_name,
                last_name,
                phone_number,
                address,
                city,
                gender
            } = req.body;


            let password = first_name.charAt(0).toUpperCase() + first_name.slice(1) + "." + last_name.charAt(0).toUpperCase() + last_name.slice(1);;
            let username = first_name.toLowerCase() + "." + last_name.toLowerCase();
            let hash = await bcrypt.hash(password, 10);
            let email = `${username}@mobishopm.com`;

            const user = await User.findOne({where: {username: username}})
            if(user != null){
               return res.send(`User with username: ${username} already exists!`);
            }else{
                const person = await Persons.create({
                    first_name:first_name,
                    last_name:last_name,
                    phone_number: phone_number,
                    address:address,
                    city:city,
                    email:email,
                    gender:gender
                });
                const newUser = await User.create({
                    username: username,
                    password: hash,
                    PersonId: person.id,
                    RoleId: 1
                });



                return res.json(`New user successfully added, username: ${first_name}.${last_name}`);
            }
        }
    }catch(error){
        return res.status(401).json(error.message);
    }
})

router.delete("/delete/:id", adminMiddleware ,async(req, res) => {
    try{
        const ids = req.params.id;
        const toDelete = await Persons.findOne({
            where: {
                id : ids
            }
        });
        await toDelete.destroy();

    }catch(error){
        console.log(error);
    }
})

module.exports = router;