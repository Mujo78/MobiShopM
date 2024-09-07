const asyncHandler = require("express-async-handler");
const { User, Person } = require("../models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createToken = async (user, statusCode, res) => {
  const token = signToken(user.id);

  res.status(statusCode).json({
    token,
    id: user.id,
    role: user.roleId,
    username: user.username,
  });
};

const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.unscoped().findOne({ where: { username } });

  if (!user) {
    res.status(404);
    return next(new Error("Account doesn't exist."));
  }

  const isValid = await user.correctPassword(password, user.password);

  if (!isValid) {
    res.status(400);
    return next(new Error("Incorrect username or password!"));
  }
  createToken(user, 200, res);
});

const changeMyUsername = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { username } = req.body;

  const user = await User.findByPk(userId);

  if (!user) {
    res.status(404);
    return next(new Error("User not found!"));
  }

  await user.update({ username });

  return res.status(200).json(user);
});

const changeMyPassword = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { password, newPassword, confirmPassword } = req.body;

  const user = await User.unscoped().findByPk(userId);

  if (!user) {
    res.status(404);
    return next(new Error("User not found!"));
  }

  if (newPassword === confirmPassword) {
    const isValid = await user.correctPassword(password, user.password);

    if (isValid) {
      await user.update({ password: newPassword });

      createToken(user, 200, res);
    } else {
      res.status(400);
      return next(new Error("Wrong password"));
    }
  } else {
    res.status(400);
    return next(new Error("New Password and Confirm Password must match!"));
  }
});

const getAdmins = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;

  const { rows, count } = await User.findAndCountAll({
    order: [["createdAt", "DESC"]],
    limit,
    offset,
    attributes: {
      exclude: ["personId", "createdAt", "updatedAt", "roleId"],
    },
    where: {
      id: {
        [Op.ne]: userId,
      },
      roleId: 1,
    },
    include: [
      {
        model: Person,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
  });

  return res.status(200).json({
    data: rows,
    numOfPages: Math.ceil(count / limit),
    currentPage: page,
  });
});

module.exports = {
  getAdmins,
  changeMyPassword,
  changeMyUsername,
  login,
};
