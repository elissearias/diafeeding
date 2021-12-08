const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const { User } = require('../models/user');


//Endpoint to register Administrator
const registerAdministrator = async ( req = request, res = response ) => {
    const { email, fullname, cellphone, password,role }  = req.body;
    try {
        const user = new User({ email, fullname, username, password, wakeUp, sleep, role});  
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();
        res.status(201).json({
            msg: 'User saved successfully'
        });
    } catch ( error ) {
        console.log( error );
        res.status(500).json({
            msg: 'error contact the administrator'
        })
    }
}

//Endpoint to get  Administrator
const consultAdministrator = async (req = request, res = response) => {
    const { id } = req.params;
    const { email, fullname, role} = await User.findByPk( id );
    res.status(302).json({ email, fullname, role })
}

//Endpoint to delete Administrator
const deleteAdministrator = async ( req = request, res = response ) => {
    const { id } = req.params;
    const user = await User.findByPk( id );
    await user.update({status:0});
    res.json({
        msg: `Admin with ID ${id} deleted`
    })
}

//Endpoint to update Administrator
const updateAdministrator = async ( req = request, res = response ) => {
    const { id } = req.params;
    const { fullname, wakeUp, sleep } = req.body;
    
    const user = await User.findByPk( id );
    user.update({ fullname, wakeUp, sleep })

    res.json({
        msg: `Admin ${id} updated`
    })
}


module.exports = {
    registerAdministrator,
    consultAdministrator,
    deleteAdministrator,
    updateAdministrator
}