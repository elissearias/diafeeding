const { DataTypes } = require('sequelize');
const { db } = require('../db/config');

const CategoryQuestion = db.define('CategoryQuestion',{
    idCategory: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true,
        field: 'id_category',
        validate:{isNumeric:true}
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'category'
    }
}, {
    tableName: 'category_questions',
    createdAt: false,
    updatedAt:false
});


module.exports = {  
    CategoryQuestion
};