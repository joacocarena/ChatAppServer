const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    const token = req.header('x-token');

    if (!token) { // Si no llega ningun token
        return res.status(401).json({
            ok: false,
            msg: 'No token found in the request'
        });
    }

    // validating token's existance
    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token not valid'
        })
    }

}

module.exports = { validateJWT }