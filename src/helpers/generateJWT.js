const jwt = require('jsonwebtoken');

const generateJWT = ( email = '' ) => {
    return new Promise ((resolve, reject) => {
        const payload = {email}; 
        jwt.sign(payload,process.env.PRIVATEKEY, {
            expiresIn: '365d'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Cannot generate token');
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = {
    generateJWT
}