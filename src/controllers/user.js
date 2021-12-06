const { response, request } = require('express');
const bcryptjs = require ('bcryptjs');
const  { User }   = require('../models/user');

//Endpoint to register User
const registerUser = async ( req = request, res = response ) => {
    const { email, fullname, username, password, wakeUp, sleep }  = req.body;
    try {
        const user = new User({ email, fullname, username, password, wakeUp, sleep, role:'USER_ROLE' });  
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();
        res.status(201).json({
            msg: 'User registered successfully!'
        });
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
    await user.update({status:0});
    res.json({
        msg: `User with ID ${id} deleted`
    })
}

//Endpoint to update User
const updateUser = async ( req = request, res = response ) => {
    const { id } = req.params;
    const { fullname, wakeUp, sleep } = req.body;
    
    const user = await User.findByPk( id );
    user.update({ fullname, wakeUp, sleep })

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