var router = require('express').Router();
const User = require('../db/User');

router.post('/', (req, res, next) => {

    User.login(req.body)
        .then(user => {
            req.session.user = user;
            delete user.dataValues.password;
            // console.log(user);
            res.send(user);
        })
        .catch(err => {
            res.status(401).send(err);
        });
});

router.post('/signup', (req, res, next) => {
    console.log("got request for signup")
    User.create(req.body)
        .then(user => {
            res.send(user);
        })
        .catch(next);
})

module.exports = router;
