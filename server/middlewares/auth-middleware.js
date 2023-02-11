const {verify} = require("jsonwebtoken");
const {Korisnik} = require("../models")

exports.authMiddleware = async (req, res, next) =>{
    const token = req.header("access-token")

    if(!token) return res.status(401).json();

    try{

        var payload = await verify(token.split("Bearer ")[1],process.env.SECRET);
        
        req.user = payload;
        const userDB = await Korisnik.findByPk(payload.id);
        
        console.log(userDB.RoleId);
        if(userDB.RoleId == 1){
            next();
        }else{
            return res.status(401).json();
        }
    }catch(error){
        return res.status(401).json();
    }
}