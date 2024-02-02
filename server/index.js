const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

const PORT = process.env.PORT || 3001;
//const sequelize = require("./config/db.config");
const db = require("./models");

const personRutes = require("./routes/person-routes");
const mobileRutes = require("./routes/mobile-routes");
const userRutes = require("./routes/user-routes");
const commentRutes = require("./routes/comments-routes");
const brandRutes = require("./routes/brand-routes");
const cartRutes = require("./routes/cart-routes");
const cartItemRutes = require("./routes/cart-items-routes");
const searchRutes = require("./routes/search-routes");
const orderRutes = require("./routes/order-routes");
const orderItemRutes = require("./routes/order-items-routes");
const wishlistRoutes = require("./routes/wishlist-routes");

app.use("/api/", personRutes);
app.use("/api/", mobileRutes);
app.use("/api/", userRutes);
app.use("/api/", commentRutes);
app.use("/api/", brandRutes);
app.use("/api/", cartRutes);
app.use("/api/", cartItemRutes);
app.use("/api/", searchRutes);
app.use("/api/", orderRutes);
app.use("/api/", orderItemRutes);
app.use("/api/", wishlistRoutes);

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("Its working!");
  });
});
