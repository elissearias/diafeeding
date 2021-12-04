const { Sequelize } = require('sequelize');


const db = new Sequelize(process.env.DBURL);



module.exports = {db}
