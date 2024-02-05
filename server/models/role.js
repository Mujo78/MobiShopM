const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

module.exports = () => {
  const role = sequelize.define(
    "Role",
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  role.associate = (models) => {
    role.hasMany(models.User, {
      foreignKey: "roleId",
      onDelete: "cascade",
    });
  };
  return role;
};
