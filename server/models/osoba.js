module.exports = (sequelize, DataTypes) => {
    const osoba = sequelize.define("Osoba", {
        ime:{
            type: DataTypes.STRING(100),
            allowNull:false
        },
        prezime:{
            type: DataTypes.STRING(100),
            allowNull:false
        },
        broj_telefona:{
            type: DataTypes.STRING(12),
            allowNull:false
        },
        adresa:{
            type: DataTypes.STRING(100),
            allowNull:false
        },
        grad:{
            type: DataTypes.STRING(100),
            allowNull:false
        },
        email:{
            type: DataTypes.STRING(100),
        },
        spol:{
            type: DataTypes.STRING(10),
            allowNull:false
        }

    })

    osoba.associate = models => {
        osoba.hasOne(models.Korisnik, {
            onDelete: "cascade",
            foreignKey:{
                name: "OsobaId"
            }
        });
    }
    return osoba;
}