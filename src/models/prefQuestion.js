const { DataTypes } = require('sequelize');
const { db } = require('../db/config')

const PrefQuestion = db.define('PrefQuestion',{
    idPref: {
        type: DataTypes.SMALLINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        field: 'id_pref',
        validate: {isNumeric:true}
    },
    fkCategory: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        primaryKey: true,
        field: 'fk_category',
        validate: {isNumeric:true},
        references: {
            model: 'categoryQuestion',
            key: 'idCategory'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    question: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'question'
    }
}, {
    tableName: 'pref_questions',
    createdAt: false,
    updatedAt:false
});

module.exports = PrefQuestion;