const express = require("express")
const router = express.Router();

const {authMiddleware} = require("../middlewares/auth-middleware")
const {Osoba, Korisnik,Order,Order_item, Cart,Cart_item, Mobitel} = require("../models")


router.post("/buy-now-route/:id", authMiddleware, async(req, res) =>{
    try{
        const id = req.params.id;
        const user = req.user;
        const {
            payment_info,
            qnty
        } = req.body;

        const mobileWithSpecificId = await Mobitel.findOne({where: {id: id}});
        const loggedInUser = await Korisnik.findOne({where: {id: user.id}});
        const infoLoggedInUser = await Osoba.findOne({where: {id: loggedInUser.OsobaId}});
        console.log(infoLoggedInUser);

        if(!mobileWithSpecificId){
            return res.json();
        }else{
            const newOrder = await Order.create({
                KorisnikId: user.id,
                total_cost: 0,
                shipping_address: infoLoggedInUser.adresa,
                payment_info: payment_info,
                order_status: "Pending"
            })
            
            const newOrderItem = await Order_item.create({
                OrderId: newOrder.id,
                MobitelId: id,
                Quantity: qnty,
                price: qnty*mobileWithSpecificId.cijena
            })

            newOrder.total_cost = newOrderItem.price;
            await newOrder.save();
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

        const loggedInUser = await Korisnik.findOne({where: {id: user.id}});
        const infoLoggedInUser = await Osoba.findOne({where: {id: loggedInUser.OsobaId}});
        
        const cartWithId = await Cart.findOne({where: {id: cartId}});
        const allCartItemsFromCart = await Cart_item.findAll({
            where:{ 
                CartId: cartId
            },
            include: [Mobitel]
        });
        console.log(allCartItemsFromCart);
        console.log("OKS")
        const newOrder = await Order.create({
            KorisnikId: user.id,
            total_cost: 0,
            shipping_address: infoLoggedInUser.adresa,
            payment_info: payment_info,
            order_status: "Pending"
        })

        let total = 0;

        for(const item of allCartItemsFromCart){
            total += item.Mobitel.cijena * item.quantity;

            await Order_item.create({
                OrderId: newOrder.id,
                MobitelId: item.Mobitel.id,
                Quantity: item.quantity,
                price: item.quantity * item.Mobitel.cijena
           })
        }
        console.log("OK");
        newOrder.total_cost = total;
        await newOrder.save();

        for(const toDelete of allCartItemsFromCart){
        
        await toDelete.destroy();
        }    

        return res.json("Uredu je sve!");
    }catch(error){
        //return res.json(error);
        console.log(error);
    }
})

module.exports = router;

