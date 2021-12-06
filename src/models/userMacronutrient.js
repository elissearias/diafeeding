const { DataTypes } = require('sequelize');
const { db } = require('../db/config');

const UserMacroutrient = db.define('UserMacronutrient', {
    fkUser: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        primaryKey: true,
        field: 'fk_user',
        validate: {isNumeric:true},
        references: {
            model: 'User',
            key: 'idUser'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    creationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true,
        field: 'creation_date',
        validate: {is:[/([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/]}
    },
    hcoPercentage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'hco_percentage',
        validate: {isInt:true}
    },
    hcoCal: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        field: 'hco_cal',
        validate: {isDecimal:true}
    },
    hcoGrams: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        field: 'hco_grams',
        validate: {isDecimal:true}
    },
    protPercentage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'prot_percentage',
        validate: {isInt:true}
    },
    protCal: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        field: 'prot_cal',
        validate: {isDecimal:true}
    },
    protGrams: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        field: 'prot_grams',
        validate: {isDecimal:true}
    },
    lipPercentage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'lip_percentage',
        validate: {isInt:true}
    },
    lipCal: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        field: 'lip_cal',
        validate: {isDecimal:true}
    },
    lipGrams: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        field: 'lip_grams',
        validate: {isDecimal:true}
    }
}, {
    tableName: 'user_macronutrients',
    createdAt: false,
    updatedAt:false
});

module.exports = UserMacroutrient;