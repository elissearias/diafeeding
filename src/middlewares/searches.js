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
    }else{
        next(); 
    }  
}

const idExists = async ( req = request, res = response, next ) => {
    const { idUser } = req.params;
    const idExists = await User.findByPk( idUser );
    if( !idExists ){
        res.status(404).json({
            msg: `User with ID ${idUser} not found`
        }) 
    } else {
        if( !idExists.status ){
            res.status(404).json({
                msg: `User with ID ${idUser} inactive`
            })
        }else {
            next();
        }
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
            msg: `Role with ID: ${idRole} not found`
        })
    }else{
        if (!idRoleExists.status){
            res.status(404).json({
                msg: `Role with ID: ${idRole} inactive`
            })
        }else{
            next();
        }
    }
}

const activeRole = async ( req = request, res = response, next ) => {
    const { role } = req.body;
    const activeRole = await Role.findOne({where:{role}});
    if (!activeRole){
        res.status(404).json({
            msg: `Role ${role} with which you want to register does not exist`
        })
    }else{
        if (!activeRole.status){
            res.status(404).json({
                msg: `Role ${role} with which you want to register it's found inactive`
            })
        } else {
            next();
        }
    }
}


module.exports = {
    emailExists,
    idExists, 
    roleExists,
    idRoleExists,
    activeRole
}