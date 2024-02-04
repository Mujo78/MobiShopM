const asyncHandler = require("express-async-handler");
const { Model } = require("sequelize");

const getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    const data = await Model.findAll();
    if (data) return res.status(200).json(data);

    res.status(400);
    return next(new Error("There was an error, please try again later!"));
  });

const getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const data = await Model.findByPk(id);

    if (!data) {
      res.status(400);
      return next(new Error(`${Model.name} not found!`));
    }

    return res.status(200).json(data);
  });

const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    const data = await Model.findByPk(id);

    if (!data) {
      res.status(404);
      return next(new Error(`${Model.name} not found!`));
    }

    try {
      await data.destroy();
      return res.status(200).json(data);
    } catch (error) {
      res.status(404);
      return next(new Error(error));
    }
  });

module.exports = {
  getAll,
  getOne,
  deleteOne,
};
