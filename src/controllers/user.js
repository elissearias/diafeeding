const { response, request } = require('express');
const bcryptjs = require ('bcryptjs');
const { User }   = require('../models/user');
const { Role } = require('../models/role');
const { generateJWT }  = require('../helpers/generateJWT')
//Endpoint to register User and verify that role exists as USER_ROLE
const registerUser = async ( req = request, res = response ) => {
    const { email, fullname, cellphone, password }  = req.body;
    const role = 'USER_ROLE';
    try {
        const rol = await Role.findOne({where:{role}});
        if(rol){
            const user = new User({ email, fullname, cellphone, password, role}); 
            const salt = bcryptjs.genSaltSync();
            user.password = bcryptjs.hashSync(password, salt);
            
            await user.save();

            const token = await generateJWT( user.email ); 

            const {idUser} = await User.findOne({where:{email}}) 
            res.status(201).json({
                idUser,
                token,
                msg: 'User registered successfully!'
            });
        }else {
            res.status(404).json({
                msg: `Role ${role} not registered`
            })
        }
    } catch ( error ) {
        console.log( error );
        res.status(500).json({
            msg: 'error contact the Administrator'
        })
    }
}
//Endpoint to get User
const consultUser = async (req = request, res = response) => {
    const { id } = req.params;
    const { email, fullname, role} = await User.findByPk( id );
    res.status(302).json({ email, fullname, role })
}

//Endpoint to delete User
const deleteUser = async ( req = request, res = response ) => {
    const { id } = req.params;
    const user = await User.findByPk( id );
    await user.update({status:false});
    res.json({
        msg: `User with ID ${id} deleted`
    })
}

//Endpoint to update User
const updateUser = async ( req = request, res = response ) => {
    const { id } = req.params;
    const { fullname } = req.body;
    
    const user = await User.findByPk( id );
    user.update({ fullname })

    res.json({
        msg: `User ${id} updated`
    })
}

module.exports = {
    registerUser,
    consultUser,
    updateUser,
    deleteUser
}