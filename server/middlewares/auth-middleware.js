const asyncHandler = require("express-async-handler");
const { verify } = require("jsonwebtoken");
const { User } = require("../models");

exports.authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    return next(new Error("Not authorized!"));
  }
  try {
    const payload = await verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(payload.id);

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    return next(new Error(error));
  }
});
