module.exports = (sequelize, DataTypes) =>{
    const wishlist = sequelize.define("Wishlist", {
        UserId:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    wishlist.associate = models => {
        wishlist.belongsTo(models.User);

        wishlist.hasMany(models.Wish_item, {
            foreignKey:{
                name: "WishlistId"
            },
            onDelete: "cascade"
        })
    }
    return wishlist;
}