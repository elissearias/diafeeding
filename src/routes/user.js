const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT, containesRole, idExists, activeStatus, emailExists, usernameExists, validateFields, validateHour } = require('../middlewares/index');
const { validEmail, validPassword, validTime, validUsername, validFullname } = require('../helpers/validateDB')
const { consultUser, registerUser, updateUser, deleteUser } = require('../controllers/user')


const router = Router();


router.post('/register',[
    check('email','Email required').not().isEmpty().custom(validEmail),
    check('fullname', 'Fullname required').not().isEmpty().custom(validFullname),
    check('username', 'Username required').not().isEmpty().custom(validUsername),
    check('password', 'Password required').not().isEmpty().custom(validPassword),
    check('wakeUp', 'Wake up required').not().isEmpty().custom(validTime),
    check('sleep', 'Sleep required').not().isEmpty().custom(validTime),
    emailExists,
    usernameExists,
    validateHour,
    validateFields
],  registerUser);


router.get('/registered/:id',[
    validateJWT,
    containesRole('ADMIN_ROLE'),
    idExists,
    activeStatus,
    validateFields
],consultUser);

router.put('/update/:id',[
    validateJWT,
    containesRole('ADMIN_ROLE','USER_ROLE'),
    check('fullname').custom(validFullname),
    check('wakeUp').custom(validTime),
    check('sleep').custom(validTime),
    idExists,
    activeStatus,
    validateHour,
    validateFields
],updateUser);

router.delete('/delete/:id',[
    validateJWT,
    containesRole('ADMIN_ROLE'),
    idExists,
    activeStatus,
    validateFields
], deleteUser);



module.exports = router