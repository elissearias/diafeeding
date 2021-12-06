const { request, response } = require('express');
const { Role } = require('../models/role')

//Endpoin to register Roles
const registerRole = async ( req = request, res = response ) => {
    const { role } = req.body;
    try {
        const rol = new Role({ role });
        await rol.save();
        res.status(201).json({
            msg: `role ${role} registered successfully!`
        })
    } catch (error) {
        res.status(500).json({
            msg: 'error contact the Administrator'
        })
    }
}

//Endpoin to delete roles
const deleteRole = async ( req = request, res = response ) => {
    const { id } = req.params;
    const role = await Role.findByPk( id );
    await role.destroy();
    res.status(302).json({
        msg: `Role deleted`
    })
}


module.exports = {
    registerRole,
    deleteRole
}