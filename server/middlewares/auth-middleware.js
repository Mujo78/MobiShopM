const asyncHandler = require("express-async-handler");
const { verify } = require("jsonwebtoken");
const { User } = require("../models");

const roles = {
  ADMIN: 1,
  USER: 2,
};

const authorized = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
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
    res.status(500);
    return next(new Error(error));
  }
});

const restrictTo = (roleKey) => {
  const role = roles[roleKey];
  return (req, res, next) => {
    if (req.user?.roleId !== role) {
      res.status(403);
      return next(new Error("You are not authorized for this action!"));
    }
    next();
  };
};

module.exports = {
  restrictTo,
  authorized,
};
