module.exports = (sequelize) =>{
    const cart = sequelize.define("Cart");

    cart.associate = models => {
        cart.belongsTo(models.Korisnik)
    }
    return cart;
}