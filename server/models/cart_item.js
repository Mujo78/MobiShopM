module.exports = (sequelize, DataTypes) =>{
    const cart_items = sequelize.define("Cart_item", {
        quantity:{
            type: DataTypes.INTEGER,
            allowNull:false
        }
    });

    return cart_items;
}