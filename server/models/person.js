module.exports = (sequelize, DataTypes) => {
    const person = sequelize.define("Persons", {
        first_name:{
            type: DataTypes.STRING(100),
            allowNull:false
        },
        last_name:{
            type: DataTypes.STRING(100),
            allowNull:false
        },
        phone_number:{
            type: DataTypes.STRING(12),
            allowNull:false
        },
        address:{
            type: DataTypes.STRING(100),
            allowNull:false
        },
        city:{
            type: DataTypes.STRING(100),
            allowNull:false
        },
        email:{
            type: DataTypes.STRING(100),
        },
        gender:{
            type: DataTypes.STRING(10),
            allowNull:false
        }

    })

    person.associate = (models) => {
        person.hasOne(models.User, {
            foreignKey:{
               name: "PersonId"
            },
            onDelete: "cascade",
        });
    }
    return person;
}