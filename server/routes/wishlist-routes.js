const express = require("express");
const router = express.Router();

const {authMiddleware} = require("../middlewares/auth-middleware")
const {Wishlist, Wish_item, Mobile} = require("../models");


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
        console.log(error);
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
    }catch(error){
        console.log(error)
    }
})

router.get("/wish-items",authMiddleware, async(req, res) =>{
    try{

        const id = req.user.id;

        const wishFromUser = await Wishlist.findOne({where: {UserId: id}});
        if(wishFromUser !== null){
            const itemsFromUsersWish = await Wish_item.findAll({where: {WishlistId : wishFromUser.id}, include : [Mobile]})
    
            const info = itemsFromUsersWish.map(n => {
                const {id, WishlistId, MobileId, Mobile} = n;
                const {mobile_name, ram, internal,price, photo, processor} = Mobile;
    
                return {
                    id, WishlistId, MobileId,mobile_name,price, ram, internal, photo, processor
                }
            })
            return res.status(200).json(info);
        }


    }catch(error){
        console.log(error);
    }
})
module.exports = router;