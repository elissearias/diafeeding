const { request, response } = require('express');
const { CategoryQuestion } = require('../models/categoryQuestion');


//Endpoint to register the category question 
const registerCategory = ( req = request, res = response ) => {
    const  { category } = req.body;
    try {
        const categoryQuestion = new CategoryQuestion({category});
        await categoryQuestion.save();

        res.status(201).json({
            msg: `category ${category} registered sucessfully!`
        })
    } catch (error) {
        msg: 'error contact the Administrator'
    }
}


//Endpoint to consult the category question
