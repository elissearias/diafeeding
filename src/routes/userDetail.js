const { Router } = require('express');
const { check } = require('express-validator');
const { registerDetail, consultDetail } = require('../controllers/userDetail');
const { validTime } = require('../helpers/validateDB');
const { validateFields, validateHour } = require('../middlewares');
const { idExists } = require('../middlewares/searches');


const router = Router();

router.post('/registerdetails/:idUser',[
    idExists,
    check('wakeUp').not().isEmpty().custom(validTime),
    check('sleep').not().isEmpty().custom(validTime),
    check('weight').not().isEmpty().isDecimal(),
    check('height').not().isEmpty().isDecimal(),
    check('dateBirth').not().isEmpty().isDate(),
    check('gender').not().isEmpty().isBoolean(),
    check('activity').not().isEmpty().isInt(),
    validateFields
],registerDetail);

router.get('/consultdetail/:fkUser',consultDetail);







module.exports = router;