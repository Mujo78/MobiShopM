const asyncHandler = require("express-async-handler");
const { Mobile, Brand } = require("../models");
const { Op } = require("sequelize");

const getAllMobiles = asyncHandler(async (req, res, next) => {
  const allMobiles = await Mobile.findAll();

  if (allMobiles) return res.status(200).json(allMobiles);

  res.status(400);
  return next(new Error("There was an error, please try again later!"));
});

const getMobilesByTopPrices = asyncHandler(async (req, res, next) => {
  try {
    const allMobiles = await Mobile.findAll({
      order: [["price", "DESC"]],
      limit: 8,
    });

    if (allMobiles) return res.status(200).json(allMobiles);
  } catch (error) {
    res.status(400);
    return next(new Error(error));
  }
});

const getMobileById = asyncHandler(async (req, res, next) => {
  const id = req.params.mobileId;

  try {
    const mobile = await Mobile.findByPk(id);

    if (!mobile) {
      res.status(404);
      return next(new Error("Mobile not found!"));
    }

    return res.status(200).json(mobile);
  } catch (error) {
    res.status(404);
    return next(new Error(error));
  }
});

const getMobilesByBrandId = asyncHandler(async (req, res, next) => {
  const brandId = req.params.brandId;
  const page = parseInt(req.query.page) || 1;
  const searchQuery = req.query.searchQuery;
  const limit = 8;
  const offset = (page - 1) * limit;

  let options = {};
  let resObj = {};
  const brand = await Brand.findByPk(brandId);

  if (!brand) {
    res.status(404);
    return next(new Error("Brand not found!"));
  }

  options.brandId = brand.id;

  if (searchQuery) {
    options.mobile_name = {
      [Op.regexp]: `(?i)${searchQuery}`,
    };
  }

  const allMobiles = await Mobile.findAll({
    where: options,
    offset,
    limit,
    attributes: ["id", "mobile_name", "internal", "ram", "price", "photo"],
  });
  const total = await Mobile.count({ where: options });

  if (allMobiles) {
    resObj.data = allMobiles;
    resObj.numOfPages = Math.ceil(total / limit);
    resObj.currentPage = page;

    return res.status(200).json(resObj);
  }

  res.status(400);
  return next(new Error("Something went wrong, please try again later!"));
});

const addNewMobile = asyncHandler(async (req, res, next) => {
  const body = req.body;

  try {
    const alreadyExists = await Mobile.findOne({ where: body });

    if (alreadyExists) {
      res.status(400);
      return next(new Error("Mobile already exists!"));
    }

    const newOne = await Mobile.create(body);
    return res.status(200).json(newOne);
  } catch (error) {
    res.status(400);
    return next(new Error(error));
  }
});

const editMobile = asyncHandler(async (req, res, next) => {
  const id = req.params.mobileId;

  const mobileToUpdate = await Mobile.findByPk(id);

  if (!mobileToUpdate) {
    res.status(404);
    return next(new Error("Mobile not found!"));
  }

  try {
    const alreadyExists = await Mobile.findOne({
      where: req.body,
      id: {
        [Op.ne]: id,
      },
    });

    if (alreadyExists) {
      res.status(400);
      return next(new Error("Mobile already exists!"));
    }

    const updatedAlready = await mobileToUpdate.update(req.body, {
      returning: true,
    });

    return res.status(200).json(updatedAlready);
  } catch (error) {
    res.status(404);
    return next(new Error(error));
  }
});

const deleteMobile = asyncHandler(async (req, res, next) => {
  const id = req.params.mobileId;

  const mobile = await Mobile.findByPk(id);

  if (!mobile) {
    res.status(404);
    return next(new Error("Mobile not found!"));
  }

  try {
    await mobile.destroy();
    return res.status(200).json(mobile);
  } catch (error) {
    res.status(404);
    return next(new Error(error));
  }
});

const searchMobileByName = asyncHandler(async (req, res, next) => {
  const searchQuery = req.query.searchQuery;
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;

  let resObj = {};

  const { rows: allMobilesByName, count: total } = await Mobile.findAndCountAll(
    {
      where: {
        mobile_name: {
          [Op.regexp]: `(?i)${searchQuery}`,
        },
      },
      limit,
      offset,
    }
  );

  if (allMobilesByName) {
    resObj.data = allMobilesByName;
    resObj.numOfPages = Math.ceil(total / limit);
    resObj.currentPage = page;

    return res.status(200).json(resObj);
  }

  res.status(400);
  return next(new Error("There was an error, please try again later!"));
});

module.exports = {
  getAllMobiles,
  getMobilesByTopPrices,
  getMobileById,
  addNewMobile,
  deleteMobile,
  editMobile,
  getMobilesByBrandId,
  searchMobileByName,
};
