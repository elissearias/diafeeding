const { DataTypes } = require('sequelize');
const { db } = require('../db/config')

const User = db.define('User', 
{
    idUser:{
        type:DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true,
        field: 'id_user',
        validate: {isNumeric:true}
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'email',
        validate: {is:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/]}
    },
    fullname:{
        type: DataTypes.STRING,
        allowNull: false,
        field: 'fullname',
        validate: {is:[/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/]}
    },
    cellphone:{
        type: DataTypes.STRING,
        allowNull: false,
        field: 'cellphone',
        validate: {is:[/^[+]{1}[\d]{8,15}$/]}
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password',
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
        field: 'fk_role',
        references: {
            model: 'role',
            key: 'role'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    status:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'status'
    },
    google: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'google'
    },
    facebook: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'facebook'
    }
}, {
    tableName: 'users',
    createdAt: false,
    updatedAt:false
});

module.exports = {
    User
};