const express = require("express")
const { validationResult } = require("express-validator")
const router = express.Router()
const {loginUser} = require("../validators/korisnik")
const {sign} = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const {Korisnik} = require("../models")
const { authMiddleware } = require("../middlewares/auth-middleware")

router.post("/login",loginUser, async(req, res) => {
    const {username, password} = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(401).json(errors);
    }
        const user = await Korisnik.findOne({where: {username: username}});
        if(user === null){
            errors.errors.push({value: '', msg: 'Username or password is incorrect!', param: 'password', location: 'body'})
            return res.status(401).json(errors);
        }else{
            const isPasswordValid = await bcrypt.compare(password, user.password);
            
                if(isPasswordValid){
                    const token = sign({
                        id: user.id,
                        username: user.username
                    }, process.env.SECRET)

                    return res.status(200).json({
                        accessToken: token,
                        username: user.username,
                        id: user.id,
                        RoleId: user.RoleId
                })
                }else{
                    errors.errors.push({value: '', msg: 'Username or password is incorrect!', param: 'password', location: 'body'})
                    return res.status(401).json(errors);
                }
            }
})

router.get("/user", authMiddleware ,async(req, res) =>{
    const user = req.user;
    
    const userForFront = await Korisnik.findOne({where: { id: user.id }}) 

    return res.status(200).json({
        id: userForFront.id,
        username: userForFront.username,
        RoleId: userForFront.RoleId
    })
})
module.exports = router;