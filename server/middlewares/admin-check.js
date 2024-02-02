const { verify } = require("jsonwebtoken");
const User = require("../models");

exports.adminMiddleware = async (req, res, next) => {
  const token = req.header("accessToken");

  if (!token) return res.status(401).json();

  try {
    var payload = await verify(token.split("Bearer ")[1], process.env.SECRET);
    req.user = payload;

    let user = await User.findOne({ where: { id: req.user.id } });

    if (user.RoleId == 1) {
      next();
    } else {
      res.status(401).json();
    }
  } catch (err) {
    res.status(401).json();
  }
};
