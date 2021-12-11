const { response, request } = require('express');
const { User }   = require('../models/user');

//Endpoint to consult User
const consultUser = async (req = request, res = response) => {
    const { idUser } = req.params;
    const { email, fullname, cellphone, role} = await User.findByPk( idUser );
    res.status(302).json({ email, fullname, cellphone, role })
}

//Endpoint to delete User
const deleteUser = async ( req = request, res = response ) => {
    const { idUser } = req.params;
    const user = await User.findByPk( idUser );
    await user.update({status:false});
    res.json({
        msg: `User with ID ${idUser} deleted`
    })
}

//Endpoint to update User
const updateUser = async ( req = request, res = response ) => {
    const { idUser } = req.params;
    const { fullname, cellphone } = req.body;
    const user = await User.findByPk( idUser );
    user.update({ fullname, cellphone })
    res.json({
        msg: `User ${idUser} updated`
    })
}

module.exports = {
    //registerUser,
    consultUser,
    updateUser,
    deleteUser
}