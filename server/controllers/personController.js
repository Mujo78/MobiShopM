const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { User, Person, Cart, sequelize } = require("../models");
const bcrypt = require("bcrypt");

const getAllUsers = asyncHandler(async (req, res) => {
  const data = await User.findAll({ attributes: { exclude: ["password"] } });

  if (data) return res.status(200).json(data);
  return res
    .status(400)
    .json({ message: "There was an error, please try again later!" });
});

const registration = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

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

      return person;
    });

    return res.status(200).json(`Registration successful: ${result.username}.`);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

module.exports = {
  registration,
  getAllUsers,
};
