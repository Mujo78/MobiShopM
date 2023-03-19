module.exports = (sequelize, DataTypes) => {
    const order_items = sequelize.define("Order_item", {
        OrderId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        MobitelId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Quantity:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price:{
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    });

    order_items.associate = models => {
        order_items.belongsTo(models.Order);

        order_items.belongsTo(models.Mobitel, {
            onDelete: "cascade"
        });
    }

    return order_items;
}