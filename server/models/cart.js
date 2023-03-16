module.exports = (sequelize, DataTypes) =>{
    const cart = sequelize.define("Cart", {
        KorisnikId:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    cart.associate = models => {
        cart.belongsTo(models.Korisnik);

        cart.hasMany(models.Cart_item, {
            foreignKey:{
                name: "CartId"
            },
            onDelete: "cascade"
        })
    }
    return cart;
}