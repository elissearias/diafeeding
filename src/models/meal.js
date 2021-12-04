const { DataTypes } = require('sequelize');
const { db } = require('../db/config')

const Meal = db.define('Meal', 
{
    id_value_meal: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    meal_name: {
        type: String
    }
}, {
    tableName: 'meals',
    createdAt: false,
    updatedAt:false
});

module.exports = {
    Meal
}