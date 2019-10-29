const router = require('express').Router();
const { User } = require('../models');
const jwt = require('../modules/jwt');
const userRouter = require('./user');

router.get('/', (req, res) => res.send('Hello world!'));
router.post('/register', (req, res, next) => {
    const { email, firstName, lastName, password } = req.body;
    User.create({ email, firstName, lastName, password })
        .then(user => res.send(user))
        .catch(next);
});
router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email }).then(user => {
        if (!user) { res.send({ error: '[NOT_FOUND]' }); return };
        return Promise.all([user, jwt.create({ id: user._id })]);
    })
        .then(([user, token]) => {
            res.cookie('auth_cookie', token).send({ user });
        })
        .catch(next);
});

module.exports = router;