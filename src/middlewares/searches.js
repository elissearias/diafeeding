const { User } = require('../models/user');
const { Role } = require('../models/role');
const { request, response } = require('express');

const emailExists = async ( req = request ,res = response, next ) => {
    const { email } = req.body;
    const emailExists = await User.findOne({where:{email}});
   
    if ( emailExists ){
        res.status(302).json({
            msg: `Email ${email} is already registered`
        })
    }else { next(); }
}


const usernameExists = async ( req = request, res = response, next ) => {
    const { username } = req.body;
    const usernameExists = await User.findOne({where:{username}});
    if ( usernameExists ){
        res.status(302).json({
            msg: `Username ${username} existing`
        })
    } else { next(); }
}

const idExists = async ( req = request, res = response, next ) => {
    const { id } = req.params;
    const idExists = await User.findByPk( id );
    if( !idExists ){
        res.status(404).json({
            msg: `User with ID ${id} not found`
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




module.exports = {
    emailExists,
    usernameExists,
    idExists, 
    activeStatus,

}