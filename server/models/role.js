module.exports = (sequelize, DataTypes) => {
    const role = sequelize.define("Role", {
        name:{
            type: DataTypes.STRING(20),
            allowNull:false
        }
    })

    role.associate = models => {
        role.hasMany(models.User, {
            foreignKey: {
                name: "RoleId"
            }
        });
    }
    return role;
}