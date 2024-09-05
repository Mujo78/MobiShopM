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
const db = require("./models");

const personRoutes = require("./routes/person-routes");
const mobileRoutes = require("./routes/mobile-routes");
const userRoutes = require("./routes/user-routes");
const commentRoutes = require("./routes/comments-routes");
const brandRoutes = require("./routes/brand-routes");
const cartRoutes = require("./routes/cart-routes");
const searchRoutes = require("./routes/search-routes");
const orderRoutes = require("./routes/order-routes");
const wishlistRoutes = require("./routes/wishlist-routes");

const { errorHandler } = require("./middlewares/errorMiddleware");

app.use("/api/v1/brand", brandRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/comment", commentRoutes);
app.use("/api/v1/mobile", mobileRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/person", personRoutes);
app.use("/api/v1/search", searchRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);

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
