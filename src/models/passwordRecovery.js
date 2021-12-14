const { DataTypes } = require('sequelize');
const { db } = require('../db/config');

const PasswordRecovery = db.define('PasswordRecovery',{
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
    creationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'creation_date',
        validate: {isDate:true}
    },
    codeVerification: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'code_verification',
        validate: {is:[/^[\d]{5}$/]}
    },
    expired: {
        type: DataTypes.BOOLEAN,
        field: 'expired',
        validate: {isDate:true}
    },
    expiredDate: {
        type: DataTypes.DATE,
        field: 'expired_date',
        validate: {isDate:true}
    }
}, {
    tableName: 'password_recovery',
    createdAt: false,
    updatedAt:false
});

module.exports =  { 
    PasswordRecovery
}