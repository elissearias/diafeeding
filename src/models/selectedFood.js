const { DataTypes } = require('sequelize');
const { db } = require('../db/config')

const selected_food = db.define('Selected_food', 
{
    id_selected_food: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    selected_food_name: {
        type: DataTypes.STRING
    },
    fk_id_email: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'selected_foods',
    createdAt: false,
    updatedAt:false
});

module.exports = {
    selected_food
}

