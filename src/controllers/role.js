const { request, response } = require('express');
const { Role } = require('../models/role')

//Endpoin to register Roles
const registerRole = async ( req = request, res = response ) => {
    const { role } = req.body;
    try {
        const rol = new Role({ role });
        await rol.save();
        
        const {idRole} = await Role.findOne({where:{role}}); 
        res.status(201).json({
            idRole,
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
    const { idRole } = req.params;
    const role = await Role.findByPk( idRole );
    await role.update({status:false})
    res.status(302).json({
        msg: `Role deleted`
    })
}


module.exports = {
    registerRole,
    deleteRole
}