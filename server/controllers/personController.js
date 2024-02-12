const asyncHandler = require("express-async-handler");
const { User, Person, Cart, sequelize } = require("../models");

const getAllUsers = asyncHandler(async (req, res, next) => {
  const data = await User.findAll();

  if (data) return res.status(200).json(data);
  res.status(400);
  return next(new Error("There was an error, please try again later!"));
});

const getUserById = asyncHandler(async (req, res, next) => {
  const id = req.user.id;
  const user = await User.findByPk(id);

  if (!user) {
    res.status(404);
    return next(new Error("User not found!"));
  }

  const person = await Person.findByPk(user.personId);
  return res.status(200).json(person);
});

const editUserProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const userToUpdate = await Person.findByPk(userId);

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
  const userId = req.user.id;
  const user = await User.findByPk(userId);

  if (!user) {
    res.status(404);
    return next(new Error("User not found!"));
  }

  try {
    const deleted = await Person.findByPk(user.personId);
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

  try {
    const result = await sequelize.transaction(async (t) => {
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

  const user = await User.findOne({ where: { username } });

  if (user) {
    res.status(400);
    return next(new Error(`User with username: ${username} already exists!`));
  }

  try {
    const result = await sequelize.transaction(async (t) => {
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
