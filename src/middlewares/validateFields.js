const {response, request} = require ('express');
const { validationResult } = require('express-validator');


const validateFields = (req = request, res = response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    next();
}

const validateHour = (req = request, res = response, next) => {
    const { wakeUp, sleep } = req.body;
    if( wakeUp > sleep){
        return res.status(400).json({
            msg: `Wake-up time ${wakeUp} should be less than bedtime ${sleep}`
        })
    }
    next();
}

module.exports = {
    validateFields,
    validateHour
}