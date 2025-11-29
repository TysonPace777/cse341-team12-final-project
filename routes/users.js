const express = require('express');
const router = express.Router();
const utilities = require('../utilities/index');

const userController = require('../controllers/users');

router.get('/', utilities.handleErrors(userController.getAll));

router.get('/:id', utilities.handleErrors(userController.getSingle));


router.delete('/:id', utilities.handleErrors(userController.deleteUser));

module.exports = router;