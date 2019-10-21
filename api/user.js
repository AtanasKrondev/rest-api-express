const router = require('express').Router();
const { User } = require('../models');

router.get('/', (req, res, next) => {
    User.find().then(users => res.send(users)).catch(next)
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    User.findOne({ _id: id }).then(users => res.send(users)).catch(next)
});

router.post('/', (req, res, next) => {
    const { email, firstName, lastName, password } = req.body;
    User.create({ email, firstName, lastName, password })
        .then(user => res.send(user))
        .catch(next);
});

router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const { email, firstName, lastName, password } = req.body;
    User.updateOne({ _id: id }, { email, firstName, lastName, password })
        .then(user => res.send(user))
        .catch(next);
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    User.deleteOne({ _id: id })
        .then(user => res.send(user))
        .catch(next);
})

module.exports = router;