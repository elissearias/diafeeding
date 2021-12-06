const { DataTypes } = require('sequelize');
const { db } = require('../db/config')

const Role = db.define('Role',
{   
    idRole: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true,
        field: 'id_role',
        validate: {isNumeric:true}
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        field: 'role',
    }
},{
    tableName: 'roles',
    createdAt: false,
    updatedAt:false
});


module.exports = Role;