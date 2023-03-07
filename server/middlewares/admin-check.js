const {Korisnik} = require("../models")
const {verify} = require("jsonwebtoken");
const {Role} = require("../models")


exports.adminMiddleware = async (req, res, next) => {
    const token = req.header('accessToken').split('Bearer ')[1];

    if (!token) return res.status(401).json();

    try {
     
        var payload = await verify(token, process.env.SECRET);
        let user = await Korisnik.findOne({ where: { id: payload.id } })
        let role = await Role.findOne({ where: { id: user.roleId } })
        if( role.naziv == "Admin"){
            next()
        }else{
            res.status(401).json();
        }
    } catch (err) {
        return res.status(401).json();
    }
}