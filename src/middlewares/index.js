const validateFields = require('../middlewares/validateFields');
const validarJWT = require('../middlewares/validateJwt');
const validateRoles = require('../middlewares/validateRoles');
const searches  = require('../middlewares/searches');


module.exports = {
    ...validateFields,
    ...validarJWT,
    ...validateRoles,
    ...searches
}