
const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user');

const validateJWT = async ( req = request, res = response, next ) => {
    const token = req.header('authorization').replace('Bearer ','')||req.header('x-acess-token');
    //console.log(token);
    if( !token ){
        return res.status(401).json({
            msg: 'There is not token in the request'
        })
    
    } 

    console.log(token);
    try {
        const { email } = jwt.verify(token, process.env.PRIVATEKEY);
        const user = await User.findOne({where:{email}});
        //console.log(user);
        
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

module.exports = {
    validateJWT
}