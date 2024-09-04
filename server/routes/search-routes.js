const express = require("express");
const router = express.Router();
//const { Op } = require("sequelize");
//const { Mobile } = require("../models");

router.post("/search", async (req, res) => {
  return res.statusCode(200);
});
/*
  try {
    const criteriaSearch = {};
    const {
      mobile_name,
      ram,
      internal,
      screen_size,
      battery,
      price,
      BrandId,
      os,
    } = req.body;

    // Name search
    if (mobile_name !== "") {
      criteriaSearch.mobile_name = {
        [Op.like]: `%${mobile_name}%`,
      };
    }
    // RAM search
    const trueRAM = [];
    Object.keys(ram).forEach((r) => {
      if (ram[r]) {
        trueRAM.push(parseInt(r.substring(3, r.length)));
      }
    });

    if (trueRAM.length > 0) {
      criteriaSearch.ram = {
        [Op.in]: trueRAM,
      };
    }
    // Memory search
    const trueInternal = [];
    Object.keys(internal).forEach((i) => {
      if (internal[i]) {
        trueInternal.push(parseInt(i.substring(8, i.length)));
      }
    });

    if (trueInternal.length > 0) {
      criteriaSearch.internal = {
        [Op.in]: trueInternal,
      };
    }
    // Screen size
    if (screen_size !== "") {
      criteriaSearch.screen_size = screen_size;
    }
    // Battery
    if (battery !== "") {
      criteriaSearch.battery = {
        [Op.between]: [battery - 500, battery + 500],
      };
    }
    // OS -- doesnt working still
    if (os !== "") {
      if (os === "Other") {
        criteriaSearch.os = {
          [Op.and]: [{ [Op.notLike]: `Android%` }, { [Op.notLike]: `iOS%` }],
        };
      } else if (os === "Android") {
        criteriaSearch.os = {
          [Op.like]: `Android%`,
        };
      } else {
        criteriaSearch.os = {
          [Op.like]: `iOS%`,
        };
      }
    }
    // Price
    const prices = [];
    Object.values(price).forEach((c) => {
      if (c >= 0) {
        prices.push(c);
      }
    });

    if (
      prices[0] !== "" &&
      prices[1] !== "" &&
      prices[1] !== 0 &&
      prices[1] !== undefined
    ) {
      criteriaSearch.price = {
        [Op.between]: [prices[0], prices[1]],
      };
    }
    //Brands
    if (BrandId !== "All") {
      criteriaSearch.BrandId = BrandId;
    }

    const allPhones = await Mobile.findAll({ where: criteriaSearch });
    if (allPhones.length === 0) {
      return res.status(401).json("No search results!");
    } else {
      return res.status(200).json(allPhones);
    }
  } catch (error) {
    return res.status(401).json(error);
  }
});
*/

module.exports = router;
