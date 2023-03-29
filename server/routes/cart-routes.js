const express = require("express");
const { validationResult } = require("express-validator");
const {authMiddleware } = require("../middlewares/auth-middleware");
const router = express.Router();
const {Cart, Mobile, Cart_item, User} = require("../models");

router.post("/add-to-cart/:id", authMiddleware, async(req, res) => {
    try{
        const id = req.params.id;
        const user = req.user;
        if(!user){
            return res.status(401).json();
        }else{
            const {
                quantity
            } = req.body;
    
            const mobileWithId = await Mobile.findOne({where: {id: id}});
            if(!mobileWithId){
                res.status(401).json();
            }else{
                const userWithCart = await Cart.findOne({where: {UserId: user.id}})
                if(userWithCart === null){
                    const userWithCart = await Cart.create({
                        UserId: user.id
                    })
                }
                const allCartItems = await Cart_item.findAll({where: {CartId: userWithCart.id}});
                const mobIds = allCartItems.map(n => n.dataValues.MobileId);
                if(!mobIds.includes(mobileWithId.id)){
                    const newCartItem = await Cart_item.create({
                        quantity: quantity > 10 ? 10 : quantity,
                        CartId: userWithCart.id,
                        MobileId: mobileWithId.id
                    })
                    mobileWithId.quantity = mobileWithId.quantity - quantity === 0 ? 10 : mobileWithId.quantity - quantity;
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
        const Users = await User.findOne({where: {id: user.id}});
        if(Users.RoleId !== 1){

            const cartWithId = await Cart.findOne({where: {UserId : id}})
            const cartItemsForCart = await Cart_item.findAll({where: {CartId: cartWithId.id}, include: [Mobile]});
            if(cartItemsForCart !== null){
                const cartItems = cartItemsForCart.map(n =>{
                    const {Mobile, quantity} = n;
                    const {id, mobile_name, ram, internal, price} = Mobile;
                    return {
                        id, mobile_name, ram, internal,price, quantity
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

        const cartWithId = await Cart.findOne({where: {UserId: id}});
        const cartItems = await Cart_item.findAll({where: {CartId: cartWithId.id}});

        return res.status(200).json(cartItems);
    }catch(error){
        return res.status(401).json(error);
    }
})

module.exports = router;