const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));
router.use('/users', require("./users"));
router.use('/tasks', require("./tasks"));

module.exports = router;