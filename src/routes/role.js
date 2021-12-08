const { Router } = require('express');
const { check } = require('express-validator');
const { registerRole, deleteRole } = require('../controllers/role');
const { roleExists, idRoleExists } = require('../middlewares/searches');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

router.post('/register',[
    roleExists,
    validateFields
], registerRole);

router.delete('/delete/:idRole', [
    idRoleExists,
    validateFields
], deleteRole)



module.exports = router;