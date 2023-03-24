const express = require("express");
const { validationResult } = require("express-validator");
const {authMiddleware } = require("../middlewares/auth-middleware");
const router = express.Router();
const {Cart, Mobitel, Cart_item, Korisnik} = require("../models");

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
                if(userWithCart === null){
                    const userWithCart = await Cart.create({
                        KorisnikId: user.id
                    })
                }
                const allCartItems = await Cart_item.findAll({where: {CartId: userWithCart.id}});
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
        const user = req.user;
        const Users = await Korisnik.findOne({where: {id: user.id}});
        console.log(Users);
        if(Users.RoleId !== 1){

            const cartWithId = await Cart.findOne({where: {KorisnikId : id}})
            const cartItemsForCart = await Cart_item.findAll({where: {CartId: cartWithId.id}, include: [Mobitel]});
            if(cartItemsForCart !== null){
                const cartItems = cartItemsForCart.map(n =>{
                    const {Mobitel, quantity} = n;
                    const {id, naziv, ram, internal, cijena} = Mobitel;
                    return {
                        id, naziv, ram, internal,cijena, quantity
                    }
    
                })
                return res.status(200).json(cartItems);
            }
        }
    }catch(error){
        return res.status(401).json(error);
    }
})

router.get("/cart/cart-items/:id", authMiddleware, async(req, res) =>{
    try{
        const id = req.params.id;

        const cartWithId = await Cart.findOne({where: {KorisnikId: id}});
        const cartItems = await Cart_item.findAll({where: {CartId: cartWithId.id}});

        return res.status(200).json(cartItems);
    }catch(error){
        return res.status(401).json(error);
    }
})

module.exports = router;