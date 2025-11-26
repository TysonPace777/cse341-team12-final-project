const express = require('express');
const router = express.Router();
const utilities = require('../utilities/index');

const userController = require('../controllers/users');

router.get('/:id', utilities.handleErrors(userController.getSingle));

module.exports = router;