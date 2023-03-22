const express = require("express");
const { validationResult } = require("express-validator");
const {authMiddleware } = require("../middlewares/auth-middleware");
const router = express.Router();
const {Cart, Mobitel, Cart_item} = require("../models");

router.delete("/delete-item/:id", authMiddleware, async(req, res) => {
    try{
        const id = req.params.id;
        const toDelete = await Cart_item.findOne({where: {MobitelId: id}});

        await toDelete.destroy();

        return res.status(200).json();
    }catch(error){
        return res.status(401).json(error);
    }
})


module.exports = router;