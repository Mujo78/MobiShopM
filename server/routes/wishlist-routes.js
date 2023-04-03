const express = require("express");
const { adminMiddleware } = require("../middlewares/admin-check");
const router = express.Router();

const {authMiddleware} = require("../middlewares/auth-middleware")
const {Wishlist, Wish_item} = require("../models");



router.post("/add-to-wishlist/:id",authMiddleware, async(req,res) =>{
    try{
        const UserId = req.user.id;
        const id = req.params.id;

        const UsersWish = await Wishlist.findOne({where: {UserId: UserId}});
        if(!UsersWish){
            const UsersWish = await Wishlist.create({
                UserId: UserId
            })
        }

        const newWishItem = await Wish_item.create({
            WishlistId: UsersWish.id,
            MobileId: id
        })

        return res.status(200).json(newWishItem);

    }catch(error){
        return res.status(401).json(error);
    }
})


router.delete("/delete-wishitem/:id", authMiddleware, async(req, res) =>{
    try{

        const id = req.params.id;

        const toDelete = await Wish_item.findOne({where: {MobileId: id}});
        if(toDelete){
            await toDelete.destroy();

            return res.status(200).json();
        }

        return res.status(401).json();

    }catch(error){
        console.log(error)
    }
})
module.exports = router;