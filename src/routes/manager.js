const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT, containesRole, idExists, emailExists, validateFields, activeRole} = require('../middlewares/index');
const { validEmail, validFullname, validPassword, validCellphone } = require('../helpers/validateDB');
const { saveManagerRoles } = require('../controllers/authentication');
const { consultUser, updateUser, deleteUser } = require('../controllers/user');

const router = Router();

router.post('/register', [
    check('email','Email required').not().isEmpty().custom(validEmail),
    check('fullname', 'Fullname required').not().isEmpty().custom(validFullname),
    check('cellphone', 'Cellphone required').not().isEmpty().custom(validCellphone),
    check('password', 'Password required').not().isEmpty().custom(validPassword),
    emailExists,
    activeRole,
    validateFields,
], saveManagerRoles);

router.get('/regestered/:idUser', [
    validateJWT,
    containesRole('ADMIN_ROLE'),
    idExists,
    validateFields
], consultUser);

router.put('/update/:idUser', [
    validateJWT,
    containesRole('ADMIN_ROLE'),
    check('fullname').custom(validFullname),
    check('cellphone').custom(validCellphone),
    idExists,
    validateFields
], updateUser);

router.delete('/delete/:idUser', [
    validateJWT,
    containesRole('ADMIN_ROLE'),
    idExists,
    validateFields
], deleteUser);




module.exports = router;
