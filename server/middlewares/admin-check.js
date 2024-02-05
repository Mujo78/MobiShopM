const { verify } = require("jsonwebtoken");
const { User } = require("../models");

exports.adminMiddleware = async (req, res, next) => {
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

    let user = await User.findByPk(payload.id);

    if (user.roleId == 1) {
      req.user = payload;
      next();
    } else {
      res.status(401).json();
    }
  } catch (err) {
    res.status(401).json();
  }
};
