const { request, response } = require('express')
const bcryptjs = require('bcryptjs')
const { User } = require('../models/user');
const { generateJWT } = require('../helpers/generateJWT') 


const login = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {
        //Email exists
        const user = await User.findOne({where:{email}})
        if (!user){
            return res.status(400).json({
                msg: 'User / Password are not correct - email'
            });
        }

        //Active user
        if (!user.status){
            return res.status(400).json({
                msg: 'Usuario / Password are not correct - status inactive'
            });
        }

        //The password is the same
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password are not correct - password'
            });
        }

        //generate JWT
        const token = await generateJWT( user.email ); 

        res.json({
            msg: 'Successful authentication!',
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'error contact the administrator'
        })
    }
}

module.exports = {
    login
}