module.exports = (sequelize, DataTypes) =>{
    const cart = sequelize.define("Cart", {
        UserId:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    cart.associate = models => {
        cart.belongsTo(models.User);

        cart.hasMany(models.Cart_item, {
            foreignKey:{
                name: "CartId"
            },
            onDelete: "cascade"
        })
    }
    return cart;
}