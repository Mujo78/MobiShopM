const asyncHandler = require("express-async-handler");
const { User, Person, Cart, sequelize, UserToken } = require("../models");
const { Op } = require("sequelize");
const crypto = require("crypto");
const Email = require("../utils/email");

const getAllUsers = asyncHandler(async (req, res, next) => {
  const data = await User.findAll();
  return res.status(200).json(data);
});

const getUserById = asyncHandler(async (req, res, next) => {
  const id = req.user.id;
  const user = await User.findByPk(id);

  if (!user) {
    res.status(404);
    return next(new Error("User not found!"));
  }

  const person = await Person.findByPk(user.personId);
  if (!person) {
    res.status(404);
    return next(new Error("User not found!"));
  }

  return res.status(200).json(person);
});

const editUserProfile = asyncHandler(async (req, res, next) => {
  const personId = req.user.id;

  const userToUpdate = await Person.findByPk(personId);

  if (!userToUpdate) {
    res.status(404);
    return next(new Error("User not found!"));
  }

  const userExists = await Person.findOne({
    where: {
      id: {
        [Op.ne]: personId,
      },
      [Op.or]: [
        { email: req.body.email },
        { phone_number: req.body.phone_number },
      ],
    },
  });

  if (userExists) {
    if (userExists.email === req.body.email) {
      res.status(409);
      return next(new Error("Email already used!"));
    }
    if (userExists.phone_number === req.body.phone_number) {
      res.status(409);
      return next(new Error("Phone number already used!"));
    }
  }

  const updated = await userToUpdate.update(req.body, {
    returning: true,
  });

  return res.status(200).json(updated);
});

const deletePersonProfile = async (userId, res, next) => {
  const user = await User.findByPk(userId);

  if (!user) {
    res.status(404);
    return next(new Error("User not found!"));
  }

  const deleted = await Person.findByPk(user.personId);
  if (!deleted) {
    res.status(404);
    return next(new Error("User not found!"));
  }

  await deleted.destroy();
  return res.status(200).json(deleted);
};

const deleteProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  deletePersonProfile(userId, res, next);
});

const deleteAdmin = asyncHandler(async (req, res, next) => {
  const userId = req.params.adminId;

  deletePersonProfile(userId, res, next);
});

const registration = asyncHandler(async (req, res, next) => {
  const { first_name, last_name, email, username, password, confirmPassword } =
    req.body;

  if (password !== confirmPassword) {
    res.status(400);
    return next(new Error("Passwords must match!"));
  }

  const usernameTaken = await User.findOne({ where: { username } });
  if (usernameTaken) {
    res.status(409);
    return next(new Error("User with this username already exists!"));
  }

  const userExists = await Person.findOne({
    where: { email },
  });

  if (userExists) {
    res.status(409);
    return next(new Error("Email already used!"));
  }

  try {
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const result = await sequelize.transaction(async (t) => {
      const person = await Person.create(
        {
          first_name,
          last_name,
          email,
        },
        { transaction: t }
      );

      const user = await User.create(
        {
          username,
          password,
          personId: person.id,
          roleId: 2,
        },
        { transaction: t }
      );

      await Cart.create(
        {
          userId: user.id,
        },
        { transaction: t }
      );

      await UserToken.create(
        {
          userId: user.id,
          token: crypto
            .createHash("sha256")
            .update(verificationToken)
            .digest("hex"),
          tokenType: "Verification",
          expiresAt: Date.now() + 2 * 60 * 60 * 1000,
        },
        { transaction: t }
      );

      return person;
    });

    const url = `${process.env.URL}verify/${verificationToken}`;
    await new Email(result.email, result.first_name).send(
      "Verification Email",
      url
    );
    return res
      .status(200)
      .json("Verification email is sent. Please check your inbox.");
  } catch (error) {
    res.status(500);
    return next(new Error(error));
  }
});

const generateInfoAdmin = (first_name, last_name, phone_number) => {
  let password =
    first_name.charAt(0).toUpperCase() +
    first_name.slice(1) +
    "." +
    last_name.charAt(0).toUpperCase() +
    last_name.slice(1);
  let username =
    first_name.toLowerCase() +
    "." +
    last_name.toLowerCase() +
    phone_number.slice(-3);
  let email = `${username}@mobishopm.com`;

  return { username, password, email };
};

const addNewAdmin = asyncHandler(async (req, res, next) => {
  const { first_name, last_name, phone_number, address, city, gender } =
    req.body;

  const { username, password, email } = generateInfoAdmin(
    first_name,
    last_name,
    phone_number
  );

  const user = await User.findOne({ where: { username } });

  if (user) {
    res.status(409);
    return next(new Error("User with this username already exists!"));
  }

  try {
    await sequelize.transaction(async (t) => {
      const person = await Person.create(
        {
          first_name,
          last_name,
          phone_number,
          address,
          city,
          email,
          gender,
        },
        { transaction: t }
      );

      const user = await User.create(
        {
          username,
          password,
          personId: person.id,
          roleId: 1,
        },
        { transaction: t }
      );

      return user;
    });

    return res.status(201).json();
  } catch (error) {
    res.status(500);
    return next(new Error(error));
  }
});

module.exports = {
  registration,
  getAllUsers,
  deleteProfile,
  getUserById,
  editUserProfile,
  addNewAdmin,
  deleteAdmin,
};
