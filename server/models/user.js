module.exports = (sequelize, DataTypes) =>{
    const user = sequelize.define("User", {
        username:{
            type: DataTypes.STRING(100),
            allowNull:false
        },
        password:{
            type: DataTypes.STRING(100),
            allowNull:false
        },
        RoleId:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
        PersonId:{
            type: DataTypes.INTEGER,
            allowNull:false
        }
    })

    user.associate = (models) =>{
        user.belongsTo(models.Persons, {
            foreignKey:"PersonId",
            onDelete: "cascade"
        })

        user.hasMany(models.Cart, {
            foreignKey: {
                name: "UserId"
            },
            onDelete: "cascade"
        })

        user.hasMany(models.Order, {
            foreignKey:{
                name: "UserId"
            },
            onDelete: "cascade"
        })

        user.hasMany(models.Wishlist, {
            foreignKey:{
                name: "UserId"
            },
            onDelete: "cascade"
        })
    }


    return user;
}