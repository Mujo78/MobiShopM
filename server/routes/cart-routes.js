const express = require("express");
const { validationResult } = require("express-validator");
const {authMiddleware } = require("../middlewares/auth-middleware");
const router = express.Router();
const {Cart, Mobitel, Cart_item} = require("../models");

router.post("/add-to-cart/:id", authMiddleware, async(req, res) => {
    try{
        const id = req.params.id;
        const user = req.user;
        if(!user){
            console.log(user);
            return res.status(401).json();
        }else{

            const {
                quantity
            } = req.body;
    
            const mobileWithId = await Mobitel.findOne({where: {id: id}});
            if(!mobileWithId){
                res.status(401).json();
            }else{
                const userWithCart = await Cart.findOne({where: {KorisnikId: user.id}})
                const allCartItems = await Cart_item.findAll();
                const mobIds = allCartItems.map(n => n.dataValues.MobitelId);
                if(!mobIds.includes(mobileWithId.id)){
                    const newCartItem = await Cart_item.create({
                        quantity: quantity > 10 ? 10 : quantity,
                        CartId: userWithCart.id,
                        MobitelId: mobileWithId.id
                    })
                    mobileWithId.kolicina = mobileWithId.kolicina - quantity === 0 ? 10 : mobileWithId.kolicina - quantity;
                    await mobileWithId.save();
                    return res.status(200).json(newCartItem);
                }else{
                    return res.status(401).json("Mobile is already in cart!");
                }
            }
        }

    }catch(error){
        return res.status(401).json(error);
    }
})

router.get("/cart/:id", authMiddleware, async(req, res) => {
    try{
        const id = req.params.id;

        const cartWithId = await Cart.findOne({where: {KorisnikId : id}})
        const cartItemsForCart = await Cart_item.findAll({where: {CartId: cartWithId.id}});
        if(!cartItemsForCart){
            return res.json("Empty")
        }else{
            const mobIds = cartItemsForCart.map(n => n.dataValues.MobitelId);
            const mobilesFromCart = await Mobitel.findAll({where: {id: mobIds}})
            console.log(mobilesFromCart);
            console.log("Tu");
            return res.status(200).json(mobilesFromCart);
        }
    }catch(error){
        return res.status(401).json(error);
    }
})

module.exports = router;