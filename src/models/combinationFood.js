const { DataTypes } = require('sequelize');
const { db } = require('../db/config');

const CombinationFood = db.define('CombinationFood',{
    idComb: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        field: 'id_combination',
        validate: {isNumeric:true}
    },
    fkUser: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        field: 'fk_user',
        validate: {isNumeric:true},
        references: {
            model: 'User',
            key: 'idUser'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    foods: {
        type: DataTypes.ARRAY,
        allowNull: false,
        field: 'foods',
        validate: {isArray:true}
    },
    dateCombination: {
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true,
        field: 'combinations_foods',
        validate: {is:[/([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/]}
    },
    consumed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'consumed',
        defaultValue: false
    },
    meal: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        field: 'meal',
        validate: {is:[/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/]}
    }
}, {
    tableName: 'combinations_foods',
    createdAt: false,
    updatedAt:false
});