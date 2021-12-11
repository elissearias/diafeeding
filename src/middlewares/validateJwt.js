
const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user');

const validateJWT = async ( req = request, res = response, next ) => {
    var access = '';
    const token = req.header('authorization')||req.header('x-access-token');

    if( !token ){
        return res.status(401).json({
            msg: 'There is not token in the request'
        })
    }else{
        if(token.startsWith('Bearer ')){
            access = token.replace('Bearer ','');
        }
        else {access = token;}

        try {
            const { email } = jwt.verify(access, process.env.PRIVATEKEY);
            const user = await User.findOne({where:{email}});
            
            if( !user){
                return res.status(401).json({
                    msg:'User don´t exists in database'  
                }) 
            }
            
            if( !user.status){
                return res.status(401).json({
                    msg: 'Token invalide - User with inactive status'
                })
            }
            req.user = user;
            next();
            
        } catch (error) {
            res.status(401).json({
                msg: `Token invalide ${error}`
            })
        }
    }
}

module.exports = {
    validateJWT
}