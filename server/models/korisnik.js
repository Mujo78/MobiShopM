module.exports = (sequelize, DataTypes) =>{
    const korisnik = sequelize.define("Korisnik", {
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
        OsobaId:{
            type: DataTypes.INTEGER,
            allowNull:false
        }
    })

    korisnik.associate = (models) =>{
        korisnik.belongsTo(models.Osoba, {
            foreignKey:"OsobaId",
            onDelete: "cascade"
        })

        korisnik.hasMany(models.Cart, {
            foreignKey: {
                name: "KorisnikId"
            },
            onDelete: "cascade"
        })

        korisnik.hasMany(models.Order, {
            foreignKey:{
                name: "KorisnikId"
            },
            onDelete: "cascade"
        })
    }


    return korisnik;
}