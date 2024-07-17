const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {uid};

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                reject('JWT could not generate');
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = {
    generateJWT
}