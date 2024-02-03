const asyncHandler = require("express-async-handler");
const { User, Person, Cart, sequelize } = require("../models");
const bcrypt = require("bcrypt");

const getAllUsers = asyncHandler(async (req, res, next) => {
  const data = await User.findAll();

  if (data) return res.status(200).json(data);
  res.status(400);
  return next(new Error("There was an error, please try again later!"));
});

const getUserById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findByPk(id);

  if (!user) {
    res.status(404);
    return next(new Error("User not found!"));
  }

  const person = await Person.findByPk(user.PersonId);
  return res.status(200).json(person);
});

const editUserProfile = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const userToUpdate = await Person.findByPk(id);

  if (!userToUpdate) {
    res.status(404);
    return next(new Error("User not found!"));
  }

  try {
    const updated = await userToUpdate.update(req.body, {
      returning: true,
    });

    return res.status(200).json(updated);
  } catch (error) {
    res.status(400);
    return next(new Error(error));
  }
});

const deleteProfile = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findByPk(id);

  if (!user) {
    res.status(404);
    return next(new Error("User not found!"));
  }

  try {
    const deleted = await Person.findByPk(user.PersonId);
    await deleted.destroy();
    return res.status(200).json(deleted);
  } catch (error) {
    res.status(404);
    return next(new Error(error));
  }
});

const registration = asyncHandler(async (req, res, next) => {
  const {
    first_name,
    last_name,
    phone_number,
    address,
    city,
    email,
    gender,
    username,
    password,
  } = req.body;

  let hash = await bcrypt.hash(password, 10);

  try {
    const result = await sequelize.transaction(async (t) => {
      const person = await Person.create(
        {
          first_name: first_name,
          last_name: last_name,
          phone_number: phone_number,
          address: address,
          city: city,
          email: email,
          gender: gender,
        },
        { transaction: t }
      );

      const user = await User.create(
        {
          username: username,
          password: hash,
          PersonId: person.id,
          RoleId: 2,
        },
        { transaction: t }
      );

      await Cart.create(
        {
          UserId: user.id,
        },
        { transaction: t }
      );

      return user;
    });

    return res.status(201).json(`Registration successful: ${result.username}.`);
  } catch (error) {
    res.status(400);
    return next(new Error(error));
  }
});

const generateInfoAdmin = (first_name, last_name) => {
  let password =
    first_name.charAt(0).toUpperCase() +
    first_name.slice(1) +
    "." +
    last_name.charAt(0).toUpperCase() +
    last_name.slice(1);
  let username = first_name.toLowerCase() + "." + last_name.toLowerCase();
  let email = `${username}@mobishopm.com`;

  return { username, password, email };
};

const addNewAdmin = asyncHandler(async (req, res, next) => {
  const { first_name, last_name, phone_number, address, city, gender } =
    req.body;

  const { username, password, email } = generateInfoAdmin(
    first_name,
    last_name
  );

  const user = await User.findOne({ where: { username: username } });

  if (user) {
    res.status(400);
    return next(new Error(`User with username: ${username} already exists!`));
  }

  try {
    let hash = await bcrypt.hash(password, 10);
    const result = await sequelize.transaction(async (t) => {
      const person = await Person.create(
        {
          first_name: first_name,
          last_name: last_name,
          phone_number: phone_number,
          address: address,
          city: city,
          email: email,
          gender: gender,
        },
        { transaction: t }
      );

      const user = await User.create(
        {
          username: username,
          password: hash,
          PersonId: person.id,
          RoleId: 1,
        },
        { transaction: t }
      );

      return user;
    });

    return res
      .status(201)
      .json({ message: `New Admin: ${result.username}, successfully added.` });
  } catch (error) {
    res.status(400);
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
};
