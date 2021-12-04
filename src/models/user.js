const { DataTypes } = require('sequelize');
const { db } = require('../db/config')

const User = db.define('User', 
{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique:true,
        field: 'id_user',
        validate: {isNumeric:true}
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'email',
        validate: {is:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/]}
    },
    fullname : {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'fullname',
        validate: {is:[/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/]}
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'username',
        validate: {is:[/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$/]}
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password',
    },
    wakeUp: {
        type: DataTypes.TIME,
        field: 'wake_up',
        allowNull: false,
        validate: {is:[/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/]}
    },
    sleep: {
        type: DataTypes.TIME,
        allowNull: false,
        field: 'sleep',
        validate: {is:[/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/]}
    },
    status: {
        type: DataTypes.SMALLINT,
        defaultValue: 1,
        field: 'status',
        validate: {isNumeric:true}
    },
    role: {
        type: DataTypes.STRING,
        field: 'fk_role',
        defaultValue: 'USER_ROLE'
    }
}, {
    tableName: 'users',

    createdAt: false,
    updatedAt:false
});

module.exports = {
    User
}