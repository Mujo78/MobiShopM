const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv").config()


app.use(express.json());

app.use(cors({
    origin: "*"
}))

const db = require("./models")

const personRutes = require("./routes/person-routes")
const mobileRutes = require("./routes/mobile-routes")
const userRutes = require("./routes/user-routes")
const commentRutes = require("./routes/comments-routes")
const brandRutes = require("./routes/brand-routes")
const cartRutes = require("./routes/cart-routes")
const cartItemRutes = require("./routes/cart-items-routes")
const searchRutes = require("./routes/search-routes")
const orderRutes = require("./routes/order-routes")
const orderItemRutes = require("./routes/order-items-routes")
const wishlistRoutes = require("./routes/wishlist-routes")


app.use("/", personRutes);
app.use("/", mobileRutes);
app.use("/", userRutes);
app.use("/", commentRutes);
app.use("/", brandRutes);
app.use("/", cartRutes);
app.use("/", cartItemRutes);
app.use("/", searchRutes);
app.use("/", orderRutes);
app.use("/", orderItemRutes);
app.use("/", wishlistRoutes);


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Its working!");
    })
});