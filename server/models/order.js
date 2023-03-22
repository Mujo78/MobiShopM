module.exports = (sequelize, DataTypes) => {
    const order = sequelize.define("Order", {
        KorisnikId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        order_date:{
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false
        },
        total_cost:{
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        shipping_address:{
            type: DataTypes.STRING,
            allowNull: false
        },
        payment_info:{
            type: DataTypes.STRING,
            allowNull: false
        },
        order_status:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    order.associate = models => {
        order.belongsTo(models.Korisnik);

        order.hasMany(models.Order_item, {
            foreignKey:{
                name: "OrderId"
            },
            onDelete: "cascade"
        })

    }

    return order;
}