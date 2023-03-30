const express = require("express")
const { validationResult } = require("express-validator")
const router = express.Router()
const {loginUser} = require("../validators/user")
const {sign} = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {Op} = require("sequelize");
const {User, Persons} = require("../models")
const { authMiddleware } = require("../middlewares/auth-middleware")
const { adminMiddleware } = require("../middlewares/admin-check")

router.post("/login",loginUser, async(req, res) => {
    const {username, password} = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(401).json(errors);
    }
        const user = await User.findOne({where: {username: username}});
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
    
    const userForFront = await User.findOne({where: { id: user.id }})

    if(userForFront === null){
        console.log("No user");
    }else{
        return res.status(200).json({
            id: userForFront.id,
            username: userForFront.username,
            RoleId: userForFront.RoleId
        })
    }
})

router.get("/all-admins",adminMiddleware, async(req, res) =>{
    const currentUserId = req.user.id;
    
    try{
        const allAdmins = await User.findAll({
            where: {
                id:{
                  [Op.not]: currentUserId
                },
                RoleId: 1
            }
        })
        if(!allAdmins || allAdmins.length === 0){

            return res.status(401).json("Nothing to show!");
        }else{
            const allAdminId = allAdmins.map(n => n.PersonId);
            const allAdminInfo = await Persons.findAll({where: {id: allAdminId}})

            return res.status(200).json(allAdminInfo);
        }
    }catch(error){
        console.log(error);
        return res.status(401).json(error);
    }
})

module.exports = router;