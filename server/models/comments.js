module.exports = (sequelize, DataTypes) => {
    const comments = sequelize.define("Comments", {
        name:{
            type: DataTypes.STRING(100),
            allowNull:false
        },
        email:{
            type: DataTypes.STRING(100),
            allowNull:false
        },
        comment:{
            type:DataTypes.STRING(255),
            allowNull: false
        }
    })

    return comments;
}