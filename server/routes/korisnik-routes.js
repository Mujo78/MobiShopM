const express = require("express")
const { validationResult } = require("express-validator")
const router = express.Router()
const {loginUser} = require("../validators/korisnik")
const {sign} = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const {Korisnik} = require("../models")

router.post("/login",loginUser, async(req, res) => {
    const {username, password} = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.json(errors);
    }else{
        const user = await Korisnik.findOne({where: {username: username}});
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if(isPasswordValid){
            const token = sign({
                id: user.id,
                username: user.username
            }, process.env.SECRET)

        return res.json({
            accessToken: token
        })
        }else{
            res.send("Password or Username is incorrect!");
        }

    res.status(401).json();
    }
})

module.exports = router;