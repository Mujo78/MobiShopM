const express = require("express");
const { adminMiddleware } = require("../middlewares/admin-check");
const router = express.Router();

const {authMiddleware} = require("../middlewares/auth-middleware")
const {Persons, User,Order,Order_item, Cart,Cart_item, Mobile} = require("../models")


router.post("/buy-now-route/:id", authMiddleware, async(req, res) =>{
    try{
        const id = req.params.id;
        const user = req.user;
        const {
            payment_info,
            qnty
        } = req.body;

        const mobileWithSpecificId = await Mobile.findOne({where: {id: id}});
        const loggedInUser = await User.findOne({where: {id: user.id}});
        const infoLoggedInUser = await Persons.findOne({where: {id: loggedInUser.PersonId}});
        const CartFromUser = await Cart.findOne({where: {UserId: user.id}});
        const CartItem = await Cart_item.findOne({
            where: {
                CartId: CartFromUser.id, 
                MobileId: mobileWithSpecificId.id
            }});

        if(!mobileWithSpecificId){
            return res.json();
        }else{
            const newOrder = await Order.create({
                UserId: user.id,
                total_cost: 0,
                shipping_address: infoLoggedInUser.address,
                payment_info: payment_info,
                order_status: "Pending"
            })
            
            const newOrderItem = await Order_item.create({
                OrderId: newOrder.id,
                MobileId: id,
                Quantity: qnty,
                price: qnty*mobileWithSpecificId.price
            })

            if(CartItem !== null){
                await CartItem.destroy();
            }

            newOrder.total_cost = newOrderItem.price;
            await newOrder.save();
            mobileWithSpecificId.quantity = mobileWithSpecificId.quantity - qnty <= 0 ? 10 : mobileWithSpecificId.quantity - qnty;
            await mobileWithSpecificId.save(); 
            return res.status(200).json(newOrderItem);
        }
    }catch(error){
        console.log(error);
    }
})

router.post("/order-from-cart/:cartId", authMiddleware, async (req, res) =>{
    try{
        const cartId = req.params.cartId;
        const user = req.user;

        const {
            payment_info
        } = req.body;

        const loggedInUser = await User.findOne({where: {id: user.id}});
        const infoLoggedInUser = await Persons.findOne({where: {id: loggedInUser.PersonId}});
        
        const cartWithId = await Cart.findOne({where: {id: cartId}});
        const allCartItemsFromCart = await Cart_item.findAll({
            where:{ 
                CartId: cartId
            },
            include: [Mobile]
        });
        const newOrder = await Order.create({
            UserId: user.id,
            total_cost: 0,
            shipping_address: infoLoggedInUser.address,
            payment_info: payment_info,
            order_status: "Pending"
        })

        let total = 0;

        for(const item of allCartItemsFromCart){
            total += item.Mobile.price * item.quantity;

            await Order_item.create({
                OrderId: newOrder.id,
                MobileId: item.Mobile.id,
                Quantity: item.quantity,
                price: item.quantity * item.Mobile.price
           })
        }
        newOrder.total_cost = total;
        await newOrder.save();

        for(const toDelete of allCartItemsFromCart){
        
        await toDelete.destroy();
        }    

        return res.status(200).json();
    }catch(error){
        return res.json(error);
    }
})

router.get("/orders", adminMiddleware, async (req, res) =>{
    try{

        const allOrders = await Order.findAll({
            where:{
                order_status:"Pending"
        }});
        if(allOrders !== null){
            return res.status(200).json(allOrders);
        }

    }catch(error){
        console.log(error);
    }
})

router.put("/order/:id", adminMiddleware, async(req, res) =>{
    try{
        const ids = req.params.id;
        const toUpdate = await Order.findOne({where: {id: ids}});
        if(toUpdate !== null){
            toUpdate.order_status = "Shipped";

            await toUpdate.save();

            return res.status(200).json();
        }

    }catch(error){
        return res.status(401).json(error);
    }
})
router.put("/order-cancel/:id", adminMiddleware, async(req, res) =>{
    try{
        const ids = req.params.id;
        const toUpdate = await Order.findOne({where: {id: ids}});
        if(toUpdate !== null){
            toUpdate.order_status = "Cancelled";

            await toUpdate.save();

            return res.status(200).json();
        }

    }catch(error){
        return res.status(401).json(error);
    }
})

module.exports = router;

