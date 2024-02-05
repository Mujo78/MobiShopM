const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const morgan = require("morgan");

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
const searchRutes = require("./routes/search-routes");
const orderRutes = require("./routes/order-routes");
const orderItemRutes = require("./routes/order-items-routes");
const wishlistRoutes = require("./routes/wishlist-routes");
const { errorHandler } = require("./middlewares/errorMiddleware");

app.use("/api/", personRutes);
app.use("/api/", mobileRutes);
app.use("/api/", userRutes);
app.use("/api/", commentRutes);
app.use("/api/", brandRutes);
app.use("/api/", cartRutes);
app.use("/api/", searchRutes);
app.use("/api/", orderRutes);
app.use("/api/", orderItemRutes);
app.use("/api/", wishlistRoutes);

app.all("*", (req, res, next) => {
  res.status(404).json(`Can't find ${req.originalUrl} on this server!`);
});

app.use(errorHandler);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("Its working!");
  });
});
