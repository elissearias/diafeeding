require('dotenv').config();
const Server = require('./src/models/server');
const server = new Server();

const Foods = require ('./src/models/foods');

const foods = new Foods();



foods.allFoodsGet('foods','groups','verduras,azucares_sin_grasa');





server.listen();