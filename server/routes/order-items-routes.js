const express = require("express")
const router = express.Router();

const {authMiddleware} = require("../middlewares/auth-middleware")
const {Osoba, Korisnik,Order, Cart, Mobitel} = require("../models")


router.post("/buy-now-route/:id", authMiddleware, async(req, res) =>{
    try{
        const id = req.params.id;
        const user = req.user;

        const mobileWithSpecificId = await Mobitel.findOne({where: {id: id}});
        const loggedInUser = await Osoba.findOne({where: {id: user.OsobaId}});
        console.log(user);
        if(!mobileWithSpecificId){
            return res.json();
        }else{
            res.json("Uredu je sve!");
            /*
            const newOrder = await Order.create({
                KorisnikId: user.id,

            })
            */
        }
    }catch(error){
        console.log(error);
    }
})

module.exports = router;

