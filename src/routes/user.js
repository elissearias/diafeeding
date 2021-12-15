const { Router } = require('express');
const { check } = require('express-validator');
const { saveUserRole } = require('../controllers/authentication');
const { validateJWT, containesRole, idExists, activeStatus, emailExists, validateFields, validateHour } = require('../middlewares/index');
const { validEmail, validPassword, validTime, validFullname, validCellphone } = require('../helpers/validateDB')
const { consultUser, updateUser, deleteUser } = require('../controllers/user')


const router = Router();

router.post('/register',[
    check('email','Email required').not().isEmpty().custom(validEmail),
    check('fullname', 'Fullname required').not().isEmpty().custom(validFullname),
    check('cellphone','Cellphone required').not().isEmpty().custom(validCellphone),
    check('password', 'Password required').not().isEmpty().custom(validPassword),
    check('wakeUp').not().isEmpty().custom(validTime),
    check('sleep').not().isEmpty().custom(validTime),
    check('weight').not().isEmpty().isDecimal(),
    check('height').not().isEmpty().isDecimal(),
    check('dateBirth').not().isEmpty().isDate(),
    check('gender').not().isEmpty().isBoolean(),
    check('activity').not().isEmpty().isInt(),
    emailExists,
    validateFields
],  saveUserRole('USER_ROLE'));

router.get('/registered/:idUser',[
    validateJWT,
    containesRole('ADMIN_ROLE','USER_ROLE'),
    idExists,
    validateFields
],consultUser);

router.put('/update/:idUser',[
    validateJWT,
    containesRole('ADMIN_ROLE','USER_ROLE'),
    check('fullname').custom(validFullname),
    check('cellphone').custom(validCellphone),
    idExists,
    validateFields
],updateUser);

router.delete('/delete/:idUser',[
    validateJWT,
    containesRole('ADMIN_ROLE','USER_ROLE'),
    idExists,
    validateFields
], deleteUser);



module.exports = router