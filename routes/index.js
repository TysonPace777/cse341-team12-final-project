const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  //swagger.tags-['Hello World']
  res.send('Hello World');
});

router.use('/users', require("./users"));
router.use('/tasks', require("./tasks"));
router.use('/goals', require("./goals"));


module.exports = router;