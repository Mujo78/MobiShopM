const asyncHandler = require("express-async-handler");

const getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    const data = await Model.findAll();
    return res.status(200).json(data);
  });

const getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    const data = await Model.findByPk(id);

    if (!data) {
      res.status(404);
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
    await data.destroy();
    return res.status(200).json(data);
  });

module.exports = {
  getAll,
  getOne,
  deleteOne,
};
