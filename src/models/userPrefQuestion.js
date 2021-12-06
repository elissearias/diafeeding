const { DataTypes } = require('sequelize');
const { db } = require('../db/config');

const UserPrefQuestion = db.define('UserPrefQuestion',{
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
    fkPref: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        primaryKey: true,
        field: 'fk_pref',
        validate: {isNumeric:true},
        references: {
            model: 'prefQuestion',
            deferrable: 'idPref'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'value'
    }
}, {
    tableName: 'users_pref_questions',
    createdAt: false,
    updatedAt:false
});

module.exports = UserPrefQuestion;