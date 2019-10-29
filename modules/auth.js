const jwt = require('./jwt');
const { User } = require('../models');

module.exports = function (requiredRole = 'NONE') {
    return function (req, res, next) {
        const token = req.cookies['access_token'];
        jwt.verify(token)
            .then(({ id }) => User.findById(id))
            .then(user => {
                if (!user) { return Promise.reject() };
                req.user = user; next();
            })
            .catch(() => res.status(401).send('[UNAUTHORIZED]'));
    }
}