const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT, containesRole, idExists, activeStatus, emailExists, usernameExists, validateFields, validateHour } = require('../middlewares/index');
const { validEmail, validFullname, validUsername, validPassword, validTime } = require('../helpers/validateDB');
const { registerAdministrator, consultAdministrator, deleteAdministrator, updateAdministrator } = require('../controllers/administrator');




const router = Router();

router.post('/register', [
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
], registerAdministrator);

router.get('/regestered/:id', [
    validateJWT,
    //isAdminrole,
    containesRole('ADMIN_ROLE'),
    idExists,
    activeStatus,
    validateFields
], consultAdministrator);

router.put('/update/:id', [
    validateJWT,
    containesRole('ADMIN_ROLE'),
    check('fullname').custom(validFullname),
    check('wakeUp').custom(validTime),
    check('sleep').custom(validTime),
    idExists,
    activeStatus,
    validateHour,
    validateFields
], updateAdministrator);

router.delete('/delete/:id', [
    validateJWT,
    containesRole('ADMIN_ROLE'),
    idExists,
    activeStatus,
    validateFields
], deleteAdministrator);




module.exports = router;
