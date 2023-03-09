module.exports = (sequelize, DataTypes) => {
    const brand = sequelize.define("Brand", {
        ime:{
            type: DataTypes.STRING(100),
            allowNull:false
        }
    })

    brand.associate = models => {
        brand.hasMany(models.Mobitel, {
            onDelete: "cascade",
            foreignKey: {
                name: "BrandId"
            }
        });
    }

    return brand;
}