const { DataTypes } = require('sequelize');
const { db } = require('../db/config')

const UserRation = db.define('UserRation',{
    idRation: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true,
        field: 'id_ration',
        validate: {isNumeric}
    },
    fkUser: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        field: 'fk_user',
        validate: {isNumeric},
        references: {
            model: 'User',
            key: 'id_user'
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
    foodGroup: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'food_group',
        validate: {is:[/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/]}
    },
    rations: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'rations',
        validate: {isInt:true}
    },
    protGrams: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'prot_grams',
        validate: {isInt:true}
    },
    lipGrams: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'lip_grams',
        validate: {isInt:true}
    },
    hcoGrams: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'hco_grams',
        validate: {isInt:true}
    },
    energy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'energy',
        validate: {isInt:true}
    }
}, {
    tableName: 'user_rations',
    createdAt: false,
    updatedAt:false
});

module.exports = UserRation;