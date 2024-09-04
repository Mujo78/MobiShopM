const asyncHandler = require("express-async-handler");
const { Brand, sequelize, Mobile } = require("../models");

const getAllBrands = asyncHandler(async (req, res, next) => {
  const allBrands = await Brand.findAll();
  return res.status(200).json(allBrands);
});

const addNewBrand = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  const alreadyExists = await Brand.findOne({ where: { name } });

  if (alreadyExists) {
    res.status(409);
    return next(new Error("Brand already exists."));
  }

  const newBrand = await Brand.create({ name });
  return res.status(200).json(newBrand);
});

const deleteBrand = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const brand = await Brand.findByPk(id);

  if (!brand) {
    res.status(404);
    return next(new Error("Brand not found!"));
  }

  try {
    await sequelize.transaction(async (t) => {
      await brand.destroy({ transaction: t });
      await Mobile.destroy({
        where: {
          brandId: brand.id,
        },
        transaction: t,
      });
    });

    return res.status(200).json(brand);
  } catch (error) {
    res.status(500);
    return next(new Error(error));
  }
});

module.exports = {
  getAllBrands,
  addNewBrand,
  deleteBrand,
};
