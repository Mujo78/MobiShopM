module.exports = (sequelize, DataTypes) => {
    const mobitel = sequelize.define("Mobitel", {
        naziv: {
            type: DataTypes.STRING(100),
            allowNull:false
        },
        ram:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        procesor:{
            type: DataTypes.STRING(100),
            allowNull:false
        },
        velicinaEkrana:{
            type: DataTypes.STRING(3),
            allowNull:false
        },
        baterija:{
            type: DataTypes.STRING(15),
            allowNull:false
        },
        kamera:{
            type: DataTypes.STRING(100),
            allowNull:false
        },
        cijena:{
            type: DataTypes.DOUBLE,
            allowNull:false
        }
    })

    return mobitel;
}