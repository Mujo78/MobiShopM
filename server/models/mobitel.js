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
        internal:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
        procesor:{
            type: DataTypes.STRING(100),
            allowNull:false
        },
        velicinaEkrana:{
            type: DataTypes.STRING(6),
            allowNull:false
        },
        photo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        baterija:{
            type: DataTypes.STRING(15),
            allowNull:false
        },
        os:{
            type: DataTypes.STRING(20),
            allowNull: false
        },
        kamera:{
            type: DataTypes.STRING(100),
            allowNull:false
        },
        cijena:{
            type: DataTypes.DOUBLE,
            allowNull:false
        },
        BrandId:{
            type: DataTypes.INTEGER,
            allowNull: false
        }

    })

    mobitel.associate = (models) =>{
        mobitel.belongsTo(models.Brand)
    }

    return mobitel;
}