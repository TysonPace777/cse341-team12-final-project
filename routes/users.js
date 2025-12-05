const express = require('express');
const router = express.Router();
const utilities = require('../utilities/index');

const userController = require('../controllers/users');
const {isAuthenticated} = require('../middleware/auth');

router.get('/', utilities.handleErrors(userController.getAll));
router.get('/:id', utilities.handleErrors(userController.getSingle));

router.post('/', isAuthenticated, utilities.handleErrors(userController.createUser));

router.put('/:id', isAuthenticated, utilities.handleErrors(userController.updateUser));

router.delete('/:id', isAuthenticated, utilities.handleErrors(userController.deleteUser));

module.exports = router;