"use strict";

const fs = require("fs");
const path = require("path");
const sequelize = require("../config/db.config");
const Sequelize = require("sequelize").Sequelize;
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

/*
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });
*/

db.User = require("./user")(sequelize, Sequelize.DataTypes);
db.Person = require("./person")(sequelize, Sequelize.DataTypes);
db.Role = require("./role")(sequelize, Sequelize.DataTypes);
db.Cart = require("./cart")(sequelize, Sequelize.DataTypes);
db.Cart_item = require("./cart_item")(sequelize, Sequelize.DataTypes);
db.Comment = require("./comment")(sequelize, Sequelize.DataTypes);
db.Mobile = require("./mobile")(sequelize, Sequelize.DataTypes);
db.Wishlist = require("./wishlist")(sequelize, Sequelize.DataTypes);
db.Wish_item = require("./wishlist_item")(sequelize, Sequelize.DataTypes);
db.Order = require("./order")(sequelize, Sequelize.DataTypes);
db.Order_item = require("./order_item")(sequelize, Sequelize.DataTypes);
db.Brand = require("./brand")(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
