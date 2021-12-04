const { DataTypes } = require('sequelize');
const { db } = require('../db/config')

const Role = db.define('Role',
{   
    id_role: {
        type: DataTypes.INTEGER,
    },
    role: {
        type: DataTypes.STRING,
        primaryKey: true
    }
},{
    tableName: 'roles',
    createdAt: false,
    updatedAt:false
});


module.exports = {
    Role
}