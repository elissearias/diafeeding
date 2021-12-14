const { request, response } = require('express')
const { UserDetail } = require('../models/userDetail');
const { User } = require('../models/user');

//Enpoint to record user details
const registerDetail = async ( req = request, res = response ) => {
    const { idUser } = req.params; 
    const { wakeUp, sleep, weight, height, dateBirth, gender, activity } = req.body;
    const user = await User.findByPk( idUser);
    if (user){
        try {
            console.log(idUser);
            const userDetail = new UserDetail({ idUser, wakeUp, sleep, weight, height, dateBirth, gender, activity});
            await userDetail.save();
            res.status(201).json({
                userDetail
            })
        } catch (error) {
            console.log( error );
            res.status(500).json({
                msg: 'error contact the Administrator'
            })
        }
    }
}

const consultDetail = async ( req = request, res = response ) => {
    const { idUser } = req.params;
    const { wakeUp, sleep, weight, height, dateBirth, gender, activity } = await UserDetail.findByPk( idUser );

    res.status(302).json({
        wakeUp, sleep, weight, height, dateBirth, gender, activity 
    })
}







module.exports = {
    registerDetail,
    consultDetail
}