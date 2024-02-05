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
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      personId: {
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
    user.belongsTo(models.Role, {
      foreignKey: "roleId",
      onDelete: "cascade",
    });

    user.belongsTo(models.Person, {
      foreignKey: "personId",
      onDelete: "cascade",
    });

    user.hasMany(models.Cart, {
      foreignKey: {
        name: "userId",
      },
      onDelete: "cascade",
    });

    user.hasMany(models.Order, {
      foreignKey: {
        name: "userId",
      },
      onDelete: "cascade",
    });

    user.hasMany(models.Wishlist, {
      foreignKey: {
        name: "userId",
      },
      onDelete: "cascade",
    });
  };

  return user;
};
