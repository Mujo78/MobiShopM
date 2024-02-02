const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

module.exports = () => {
  const role = sequelize.define("Role", {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  });

  role.associate = (models) => {
    role.hasMany(models.User, {
      foreignKey: {
        name: "RoleId",
      },
    });
  };
  return role;
};
