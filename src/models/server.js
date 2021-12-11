const express = require('express');
const cors = require('cors');
const { db } = require('../db/config')

class Server {

    constructor ( ) {
        this.app = express(); 
        this.port = process.env.PORT || '3000';
        this.usersPath = '/users';
        this.loginPath = '/authentication';
        this.managersPath = '/managers';
        this.rolePath = '/roles';
        this.middlewares();
        this.dbConnection();
        this.routes();
    }

    middlewares () {
        //cors
        this.app.use(cors());

        this.app.use(express.static('public'));
        this.app.use(express.json());
   }

    async dbConnection () {
        try {
           await db.authenticate();
           console.log('database  connected successfully!')
        } catch (error) {
            console.log('Unable to connect to the database:'+error)
        }
    }

    routes(){
        this.app.use(this.loginPath, require('../routes/authentication'));
        this.app.use(this.usersPath, require('../routes/user'));
        this.app.use(this.managersPath, require('../routes/manager'));
        this.app.use(this.rolePath, require('../routes/role'));
    }

    listen () {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })
    } 
}
module.exports = Server;