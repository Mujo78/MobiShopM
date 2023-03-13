const {verify} = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) =>{
    const token = req.header("accessToken");
    console.log(token)
    if(!token) return res.status(401).json();

    try{

        var payload = await verify(token.split("Bearer ")[1],process.env.SECRET);

        req.user = payload;
        next();
    }catch(error){
        return res.status(401).json();
    }
}