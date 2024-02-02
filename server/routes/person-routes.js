const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { adminMiddleware } = require("../middlewares/admin-check");
const { authMiddleware } = require("../middlewares/auth-middleware");
const { Persons, User, Cart } = require("../models");
const {
  createPersonValidator,
  createAdminValidator,
  editProfileValidator,
} = require("../validators/person");
const {
  registration,
  getAllUsers,
} = require("../controllers/personController");

router.get("/users", adminMiddleware, getAllUsers);

router.get("/person/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (id !== 0) {
      const UserById = await User.findOne({ where: { id: id } });
      const PersonById = await Persons.findOne({
        where: { id: UserById.PersonId },
      });

      return res.status(201).json(PersonById);
    }
  } catch (error) {
    return res.status(401).json(error);
  }
});

router.post("/registration", createPersonValidator, registration);

router.post("/add-admin", createAdminValidator, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(401).json(errors);
    } else {
      const { first_name, last_name, phone_number, address, city, gender } =
        req.body;

      let password =
        first_name.charAt(0).toUpperCase() +
        first_name.slice(1) +
        "." +
        last_name.charAt(0).toUpperCase() +
        last_name.slice(1);
      let username = first_name.toLowerCase() + "." + last_name.toLowerCase();
      let hash = await bcrypt.hash(password, 10);
      let email = `${username}@mobishopm.com`;

      const user = await User.findOne({ where: { username: username } });
      if (user != null) {
        return res.send(`User with username: ${username} already exists!`);
      } else {
        const person = await Persons.create({
          first_name: first_name,
          last_name: last_name,
          phone_number: phone_number,
          address: address,
          city: city,
          email: email,
          gender: gender,
        });
        const newUser = await User.create({
          username: username,
          password: hash,
          PersonId: person.id,
          RoleId: 1,
        });

        return res.json(
          `New user successfully added, username: ${first_name}.${last_name}`
        );
      }
    }
  } catch (error) {
    return res.status(401).json(error.message);
  }
});

router.put(
  "/edit-profile/:id",
  authMiddleware,
  editProfileValidator,
  async (req, res) => {
    try {
      const err = validationResult(req);
      if (!err.isEmpty()) {
        return res.status(401).json(err);
      } else {
        const id = req.params.id;
        const toUpdate = await Persons.findOne({ where: { id: id } });

        if (!toUpdate) {
          res.status(401).json("No such person in db!");
        } else {
          const {
            first_name,
            last_name,
            address,
            city,
            email,
            phone_number,
            gender,
          } = req.body;

          if (first_name != null) toUpdate.first_name = first_name;
          if (last_name != null) toUpdate.last_name = last_name;
          if (address != null) toUpdate.address = address;
          if (city != null) toUpdate.city = city;
          if (email != null) toUpdate.email = email;
          if (phone_number != null) toUpdate.phone_number = phone_number;
          if (gender != null) toUpdate.gender = gender;

          const newUpdated = await toUpdate.save();

          res.status(200).json(newUpdated);
        }
      }
    } catch (error) {
      res.status(401).json(error);
    }
  }
);
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const ids = req.params.id;
    const UserWithId = await User.findOne({ where: { id: ids } });
    const toDelete = await Persons.findOne({
      where: {
        id: UserWithId.PersonId,
      },
    });
    await toDelete.destroy();
  } catch (error) {
    console.log(error);
    //res.status(401).json(error)
  }
});

module.exports = router;
