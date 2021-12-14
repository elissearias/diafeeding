const { request, response } = require('express')
const bcryptjs = require('bcryptjs')
const { User } = require('../models/user');
const { Role } = require('../models/role');
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

//Endpoint to register User and verify that role exists as USER_ROLE
const saveUserRole =  (role = '') => {
    return async ( req = request, res = response ) => {
        try {
            const rol = await Role.findOne({where:{role}});
            if(rol){
                const { email, fullname, cellphone, password }  = req.body;
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
                    msg: `Role ${role}  does not exist`
                })
            }
        } catch ( error ) {
            console.log( error );
            res.status(500).json({
                msg: 'error contact the Administrator'
            })
        }
    }
}

const saveManagerRoles = async ( req = request, res = response ) => {

    try 
    {
        const { email, fullname, cellphone, password, role }  = req.body;
    
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
        })
    } catch ( error ) {
        console.log( error );
        res.status(500).json({
            msg: 'error contact the Administrator'
        })
    }
}


module.exports = {
    login,
    saveUserRole,
    saveManagerRoles
}