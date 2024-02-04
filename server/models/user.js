const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const bcrypt = require("bcrypt");

module.exports = () => {
  const user = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      RoleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      PersonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      hooks: {
        beforeCreate: async (user) => {
          if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 12);
          }
        },

        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 12);
          }
        },
      },
    }
  );

  user.prototype.correctPassword = async function (typedPassword) {
    return await bcrypt.compare(typedPassword, this.password);
  };

  user.associate = (models) => {
    user.belongsTo(models.Person, {
      foreignKey: "PersonId",
      onDelete: "cascade",
    });

    user.hasMany(models.Cart, {
      foreignKey: {
        name: "UserId",
      },
      onDelete: "cascade",
    });

    user.hasMany(models.Order, {
      foreignKey: {
        name: "UserId",
      },
      onDelete: "cascade",
    });

    user.hasMany(models.Wishlist, {
      foreignKey: {
        name: "UserId",
      },
      onDelete: "cascade",
    });
  };

  return user;
};
