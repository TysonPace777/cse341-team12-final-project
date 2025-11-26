const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));

module.exports = router;