const { DataTypes } = require('sequelize');
const { db } = require('../db/config')

const SelectedFood = db.define('SelectedFood', 
{
    idSelectFood: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true,
        field: 'id_selected_food',
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
    food: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        field: 'food',
        validate: {is:[/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/]}
    },
    foodGroup: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'food_group',
        validate: {is:[/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/]}
    }
}, {
    tableName: 'selected_foods',
    createdAt: false,
    updatedAt:false
});

module.exports = SelectedFood

