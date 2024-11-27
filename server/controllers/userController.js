const asyncHandler = require("express-async-handler");
const { User, Person, UserToken } = require("../models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Email = require("../utils/email");

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

const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const personFound = await Person.findOne({ where: { email } });

  if (!personFound) {
    res.status(404);
    return next(new Error("Account doesn't exist."));
  }

  const user = await User.findOne({ where: { personId: personFound.id } });
  const token = crypto.randomBytes(32).toString("hex");

  try {
    const [resetToken, created] = await UserToken.findOrCreate({
      where: { userId: user.id, tokenType: "Reset Password" },
      defaults: {
        userId: user.id,
        tokenType: "Reset Password",
        token,
      },
    });

    if (created) {
      const url = `${process.env.URL}reset-password/${resetToken.token}`;
      await new Email(personFound.email, personFound.first_name).send(
        "Reset Password Request",
        url
      );

      return res.status(200).json({
        email: personFound.email,
        url,
      });
    } else {
      return res.status(409).json({
        message:
          "You already made request for reseting password. Please check your inbox.",
      });
    }
  } catch (error) {
    res.status(500);
    return next(new Error(error));
  }
});

const resetPassword = asyncHandler(async (req, res, next) => {
  //const { token } = req.params;

  return res.status(200).json();
});

const changeMyUsername = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { username } = req.body;

  const user = await User.findByPk(userId);

  if (!user) {
    res.status(404);
    return next(new Error("User not found!"));
  }

  const userExists = await User.findOne({
    where: {
      id: {
        [Op.ne]: userId,
      },
      username,
    },
  });

  if (userExists) {
    res.status(409);
    return next(new Error("Username already taken!"));
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

      return res.status(200).json("Successfully updated password.");
    } else {
      res.status(400);
      return next(new Error("Wrong old password."));
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
  forgotPassword,
  resetPassword,
};
