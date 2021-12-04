const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/authentication');
const { validateFields } = require('../middlewares/validateFields');


const router = Router();

router.post('/login', [
    check('email','Email required').not().isEmpty(),
    check('password','password required').not().isEmpty(),
    validateFields
], login);


module.exports = router;

