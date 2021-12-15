const { DataTypes } = require('sequelize');
const { db } = require('../db/config');

const UserDetail = db.define('UserDetail',{
    idUser: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        primaryKey: true,
        field: 'fk_user',
        validate: {isInt:true},
        references: {
            model: 'User',
            key: 'idUser'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    wakeUp: {
        type: DataTypes.TIME,
        allowNull: false,
        field: 'wake_up',
        validate: {is:[/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/]}
    },
    sleep: {
        type: DataTypes.TIME,
        allowNull: false,
        field: 'sleep',
        validate: {is:[/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/]}
    },
    weight: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        field: 'weight',
        validate: {isDecimal:true}
    },
    height: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        field: 'height',
        validate: {isDecimal:true}
    },
    dateBirth: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'date_birth',
        validate: {isDate:true}
    },
    gender: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'gender'
    },
    activity: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        field: 'activity',
        validate: {isInt:true}
    }
}, {
    tableName: 'users_details',
    createdAt: false,
    updatedAt:false
});

module.exports =  { 
    UserDetail
}