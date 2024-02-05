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
    role: user.roleId,
    username: user.username,
  });
};

const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.unscoped().findOne({ where: { username } });

  if (!user) {
    res.status(400);
    return next(new Error("Incorrect username or password!"));
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

  try {
    await user.update({ username });

    return res.status(200).json(user);
  } catch (error) {
    res.status(400);
    return next(new Error(error));
  }
});

const changeMyPassword = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { password, newPassword, confirmPassword } = req.body;

  const user = await User.unscoped().findByPk(userId);

  if (!user) {
    res.status(400);
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

  const allAdmins = await User.findAll({
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
    raw: true,
  });

  if (allAdmins) return res.status(200).json(allAdmins);

  res.status(400);
  return next(new Error("Something went wrong, please try again latter!"));
});

module.exports = {
  getAdmins,
  changeMyPassword,
  changeMyUsername,
  login,
};
