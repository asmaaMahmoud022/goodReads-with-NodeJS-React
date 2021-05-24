const jwt = require('jsonwebtoken')

const accessTokenSecret = 'youraccesstokensecret'

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.status(401).send({ message: "not authorized !!" })
            }

            req.user = user;
            next();
        });
    } else {
        return res.status(401).send({ message: "Send User Token Please !!" })
    }
};

module.exports = authenticateJWT