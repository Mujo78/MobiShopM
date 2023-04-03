const express = require("express")
const router = express.Router();

const {authMiddleware} = require("../middlewares/auth-middleware")
const {Person, User,Order,Order_item, Mobile} = require("../models")


router.get("/order-item/:id",authMiddleware, async(req, res) =>{
    try{
        const id = req.params.id;
            const Item = await Order_item.findOne({where: {id: id}, include: [Mobile, Order]});
                
            if(Item !==null){

                const {Mobile, Order, Quantity} = Item;
                const {mobile_name} = Mobile;
                const {shipping_address, payment_info,order_date, order_status, total_cost} = Order;
                
                const Info = {
                    mobile_name,shipping_address, payment_info,order_date, order_status, total_cost, Quantity
                }
                return res.status(200).json(Info);
            }

    }catch(error){
        console.log(error);
        return res.status(401).json(error);
    }
})

module.exports = router;

