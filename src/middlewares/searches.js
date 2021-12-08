const { User } = require('../models/user');
const { Role } = require('../models/role');
const { request, response } = require('express');

const emailExists = async ( req = request, res = response, next ) => {
    const { email } = req.body;
    const emailExists = await User.findOne({where:{email}});
    if ( emailExists ){
        res.status(302).json({
            msg: `Email ${email} is already registered`
        })
    }else { next(); }
}

const idExists = async ( req = request, res = response, next ) => {
    const { idUser } = req.params;
    const idExists = await User.findByPk( idUser );
    if( !idExists ){
        res.status(404).json({
            msg: `User with ID ${idUser} not found`
        }) 
    } else {
        next();
    }
}

const activeStatus = async ( req = request, res = response, next ) => {
    const { id } = req.params;
    const { status } = await User.findByPk( id )

    if (!status){
        res.status(404).json({
            msg: `User with ID ${id} inactive`
        })
    } else {
        next();
    }
}

const roleExists = async ( req = request, res = response, next) => {
    const { role } = req.body;
    const roleExists = await Role.findOne({where:{role}});
    if (roleExists){
        res.status(302).json({
            msg: `Role ${role}  is registered in database `
        })
    } else {
        next();
    }
}

const idRoleExists = async ( req = request, res = response, next) => {
    const { idRole } = req.params;
    const idRoleExists = await Role.findByPk( idRole );
    if (!idRoleExists){
        res.status(404).json({
            msg: `Role with ${idRole} not found`
        })
    }else{
        next();
    }
}







module.exports = {
    emailExists,
    idExists, 
    activeStatus,
    roleExists,
    idRoleExists
}