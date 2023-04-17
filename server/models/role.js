module.exports = (sequelize, DataTypes) => {
    const role = sequelize.define("Role", {
        name:{
            type: DataTypes.STRING(20),
            allowNull:false
        }
    }, {
        timestamps: false
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