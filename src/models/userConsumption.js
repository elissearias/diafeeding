const { DataTypes } = require('sequelize');
const { db } = require('../db/config');

const UserConsumption = db.define('UserConsumption', {
    fkUser: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        primaryKey: true,
        field: 'fk_user',
        validate: {isNumeric:true},
        references: {
            model: 'user',
            key: 'idUser'
        },
        onUpdate: 'CASCADE',
        onDelete:'CASCADE'
    },
    fkImc: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        field: 'fk_imc',
        validate: {isNumeric:true},
        references: {
            model: 'imcClasification',
            key: 'idImc',
        },
        onUpdate: 'CASCADE', 
        onDelete:'CASCADE'
    },
    creationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true,
        field:'creation_date',
        validate: {is:[/([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/]}
    },
    dailyCaloric: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        field:'daily_caloric',
        validate: {isDecimal:true}
    },
    dailyGrams: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        field: 'daily_grams',
        validate: {isDecimal:true}
    },
}, {
    tableName: 'users_consumption',
    createdAt: false,
    updatedAt:false
});

module.exports = UserConsumption;