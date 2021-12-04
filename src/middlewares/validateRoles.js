const { request, response } = require('express');

const isAdminrole = ( req = request, res = response, next ) => {
    if ( !req.user ){
        return res.status(500).json({
            msg: 'It is required to verify role'
        });
    }

    const { role, nombre } = req.user;
    if ( role !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${nombre} It is not administrator - Is not authorized`
        })
    }
    next();
}

const containesRole = (...roles) => {
    return ( req = request, res = response, next ) => {
        if( !req.user ) {
            return res.status(500).json({
                msg: 'It is want to verify the role without validating the token first'
            })
        }

        if (!roles.includes( req.user.role )){
            return res.status(401).json({
                msg: `The service requires one of these roles ${roles}`
            })
        }
        next();
    }
}

module.exports = {
    isAdminrole,
    containesRole
}