const asyncHandler = require("express-async-handler");
const { Brand } = require("../models");

const getAllBrands = asyncHandler(async (req, res, next) => {
  const allBrands = await Brand.findAll();

  if (allBrands) return res.status(200).json(allBrands);

  res.status(400);
  return next(new Error("There was an error, please try again later!"));
});

const addNewBrand = asyncHandler(async (req, res, next) => {
  try {
    const { name } = req.body;

    const newBrand = await Brand.create({ name });

    return res.status(200).json(newBrand);
  } catch (error) {
    res.status(400);
    return next(new Error(error));
  }
});

const deleteBrand = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const brand = await Brand.findByPk(id);

  if (!brand) {
    res.status(404);
    return next(new Error("Brand not found!"));
  }

  try {
    await brand.destroy();
    return res.status(200).json(brand);
  } catch (error) {
    res.status(400);
    return next(new Error(error));
  }
});

module.exports = {
  getAllBrands,
  addNewBrand,
  deleteBrand,
};
