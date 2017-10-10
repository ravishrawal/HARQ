var router = require('express').Router();
const User = require('../db/User');

router.post('/', (req, res, next) => {

    User.login(req.body)
        .then(user => {
            // req.session.userId = user.id;
            // user.password = null;
            delete user.dataValues.password;
            // console.log(user);
            res.send(user);
        })
        .catch(err => {
            res.status(401).send(err);
        });
});

module.exports = router;
