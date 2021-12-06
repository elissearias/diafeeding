const { Router } = require('express');
const { check } = require('express-validator');
const { idRoleExists } = require('../middlewares/searches')


const { registerRole, deleteRole } = require('../controllers/role');

const router = Router();

router.post('/register',registerRole);

router.delete('/delete/:id',[
    idRoleExists,    
],deleteRole)


module.exports = router;