const { DataTypes, INTEGER } = require('sequelize');
const { db } = require('../db/config')

const eat_meal = db.define('Eat_meal', 
{
    id_combination: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    foods: {
        type: DataTypes.ARRAY
    },
    dates: {
        type: DataTypes.DATE
    },
    fk_id_email: {
        type: DataTypes.STRING
    },
    fk_id_meal: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'selected_foods',
    createdAt: false,
    updatedAt:false
});

module.exports = {
    eat_meal
}